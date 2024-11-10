import { getDatafromUsers, storeInUsers } from "../../utils/Redisfunctions";
import { printErrorString } from "../../utils/utilityfunctions";
import Prisma from "../Prisma";
export interface IGetUserModel {
  emailId: string;
  id: string;
  profilePicture: string;
  connections: string[];
  name: string;
}

export const GetUserModel = async (
  user: string
): Promise<IGetUserModel | null> => {
  //check if exists

  let redisConnValue = await getDatafromUsers(user);

  if (redisConnValue !== null) {
    return {
      emailId: redisConnValue.emailId,
      id: redisConnValue.id,
      profilePicture: redisConnValue.profilePicture,
      connections: redisConnValue.connections,
      name: redisConnValue.name,
    };
  }

  //make a db call to get data

  try {
    const userDetails = await Prisma.userCredentials.findUnique({
      select: {
        id: true,
        emailId: true,
        profilePicture: true,
        connections: true,
        name:true
      },
      where: {
        emailId: user,
      },
    });

    if (userDetails) {
      storeInUsers(userDetails);
      return userDetails;
    }
  } catch (error) {
    printErrorString(error);
  }

  return null;
};
