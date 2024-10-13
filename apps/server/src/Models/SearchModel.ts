import Prisma from "./Prisma";

export interface IResult {
  emailId: string;
  name: string;
  id: string;
}

export const SearchModel = async (SearchString: string): Promise<IResult[]|string> => {
  try {
    const Result: IResult[] | null = await Prisma.userCredentials.findMany({
      take:50,
      select: {
        emailId: true,
        name: true,
        id: true,
        profilePicture: true,
      },
      where: {
        name: {
          contains: SearchString,
          mode: "insensitive",
        },
      },
    });
    return Result;
  } catch (error) {
    console.log(error);
    return "Error";
  }
};
export const searchUserModel = async (SearchString: string) => {
  try {
    const Result: IResult | null = await Prisma.userCredentials.findUnique({
      select: {
        emailId: true,
        name: true,
        id: true,
        profilePicture: true,
      },
      where: {
        id: SearchString,
      },
    });
    return Result;
  } catch (error) {
    throw Error;
  }
};

export const addUser = async (
  user: string,
  addUser: string
): Promise<boolean> => {
  try {
    const result = await Prisma.userCredentials.update({
      where: {
        emailId: user,
      },
      data: {
        connections: {
          push: addUser,
        },
      },
    });

    console.log(result);
    return true;
  } catch (error) {
    console.log("error in adding user");
    return false;
  }
};
