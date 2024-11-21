import { createClient } from "redis";
import { PrismaClient } from "@prisma/client";
import { storeInUsers, userConn } from "../../utils/Redisfunctions";
import Prisma from "../Prisma";

const redisClient = createClient();
const prisma = Prisma;

redisClient.on("error", (err) => console.error("Redis Client Error", err));

interface IRequest {
  to: string;
  from: string;
  status: string;
}

async function storeRequest(request: IRequest) {
  try {
    const newRequest = await prisma.requests.create({
      data: {
        from: request.from,
        to: request.to,
        status: request.status,
      },
    });
    return newRequest;
  } catch (error) {
    console.error("Error storing request:", error);
    throw error;
  }
}

async function updateConnectionsWithRollback(userId1: string, userId2: string) {
  try {
    const prismaTransaction = await prisma.$transaction([
      prisma.userCredentials.update({
        where: { emailId: userId1 },
        data: {
          connections: {
            push: userId2,
          },
        },
      }),
      prisma.userCredentials.update({
        where: { emailId: userId2 },
        data: {
          connections: {
            push: userId1,
          },
        },
      }),
    ]);

    prismaTransaction.forEach(async (element) => {
      const user1: userConn = {
        emailId: element.emailId,
        id: element.id,
        profilePicture: element.profilePicture,
        connections: element.connections,
        name: element.name,
      };
      await storeInUsers(user1);
    });

    return prismaTransaction;
  } catch (error) {
    console.error("Error updating connections, changes rolled back:", error);
    throw error;
  }
}

async function deleteRequest(to: string, from: string, status: string) {
  const request = await prisma.requests.findFirst({
    select: {
      rid: true,
    },
    where: {
      AND: {
        to: to,
        from: from,
      },
    },
  });

  if (!request) {
    console.log("Request not found");
    return null;
  }
  if (status === "DELETED") {
    try {
      const deletedRequest = await prisma.requests.delete({
        where: {
          rid: request.rid,
        },
      });
      return deletedRequest;
    } catch (error) {
      console.error("Error deleting request:", error);
      throw error;
    }
    return;
  }

  try {
    const deletedRequest = await prisma.requests.update({
      data: {
        status: status,
        createdAt: new Date(),
      },
      where: {
        rid: request.rid,
      },
    });
    return deletedRequest;
  } catch (error) {
    console.error("Error deleting request:", error);
    throw error;
  }
}

async function hasRequest(
  to: string,
  from: string
): Promise<{ exists: boolean; substatus: string }> {
  const request = await prisma.requests.findFirst({
    where: {
      OR: [
        { to: to, from: from },
        { to: from, from: to },
      ],
    },
  });

  if (request) {
    if (request.to === to && request.from === from) {
      return { exists: true, substatus: "Already sent" };
    } else if (request.to === from && request.from === to) {
      return { exists: true, substatus: "Request already received" };
    }
  }

  return { exists: false, substatus: "" };
}

async function RequestChecker(
  to: string,
  from: string
): Promise<{ exists: boolean; substatus: string }> {
  const request = await prisma.requests.findFirst({
    where: {
      AND: {
        to: to,
        from: from,
      },
    },
  });

  if (request) {
    if (request.to === to && request.from === from) {
      return { exists: true, substatus: "sent" };
    } else if (request.to === from && request.from === to) {
      return { exists: true, substatus: "received" };
    }
  }

  return { exists: false, substatus: "" };
}

async function getRequestsByCreated(date: Date, user: string) {
  const requests = await prisma.requests.findMany({
    where: {
      OR: [{ from: user }, { to: user }],
      AND: {
        createdAt: {
          gte: date,
        },
      },
    },
  });

  if (!requests) {
    console.log("No requests found");
    return null;
  }
  return requests;
}

async function getAllRequestFromUser(user: string) {
  try {
    console.log("inside");
    const requests = await prisma.requests.findMany({
      where: {
        OR: [{ from: user }, { to: user }],
        AND: {
          status: "REQUEST",
        },
      },
    });
    return requests;
  } catch (error) {
    console.error("Error getting requests:", error);
    return null;
  }
}

async function RequestUserData(userArr: string[]) {
  // write logic for catching here

  try {
    let result = await prisma.userCredentials.findMany({
      select: {
        emailId: true,
        name: true,
        profilePicture: true,
        id: true,
      },
      where: {
        emailId: {
          in: userArr,
        },
      },
    });
    return result;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export {
  storeRequest,
  updateConnectionsWithRollback,
  deleteRequest,
  hasRequest,
  RequestChecker,
  getRequestsByCreated,
  getAllRequestFromUser,
  RequestUserData,
};
