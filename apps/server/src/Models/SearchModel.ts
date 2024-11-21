import { rmSync } from "fs";
import Prisma from "./Prisma";
import { GetUserModel } from "./userModels/GetUserDetails";
import { storeInUsers } from "../utils/Redisfunctions";

export interface IResult {
  emailId: string;
  name: string;
  id: string;
  profilePicture:string
 connections?:string[]
}

export interface IResultSearch {
  emailId: string;
  name: string;
  id: string;
  profilePicture: string;
  connections: string[];
}

export interface IAddConnection {
  emailId: string;
  name: string;
  id: string;
  profilePicture: string;
}
export const SearchModel = async (
  SearchString: string
): Promise<IResult[] | string> => {
  try {
    const Result: IResult[] | null = await Prisma.userCredentials.findMany({
      take: 50,
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


  //check in the redis

  const result = await GetUserModel(SearchString);
  const doupli: {
    emailId: string;
    id: string;
    profilePicture: string;
    connections?: string[];
    name: string;
  }|null = result;
  if (doupli) {
    delete doupli.connections;
    return doupli;
  }
  
  


  try {
    const Result: IResultSearch | null =
      await Prisma.userCredentials.findUnique({
        select: {
          emailId: true,
          name: true,
          id: true,
          profilePicture: true,
          connections: true,
        },
        where: {
          emailId: SearchString,
        },
      });
    if (Result) {
      storeInUsers(Result);
    }

    const Result2: {
      emailId: string;
      name: string;
      id: string;
      profilePicture: string;
      connections?: string[];
    }|null = Result;

    delete Result2?.connections;
    return Result;
  } catch (error) {
    throw Error;
  }
};

export const addUser = async (
  user: string,
  addUser: string
): Promise<IAddConnection|false> => {
  try {
    const result = await Prisma.userCredentials.findFirst({
      select: {
        emailId: true,
        profilePicture: true,
        id: true,
        name: true,
      },
      where: {
        emailId: user,
      },
    });

    if (result) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in adding user");
    return false;
  }
};


