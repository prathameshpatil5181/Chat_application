
import { getDatafromUsers, storeInUsers } from "../../utils/Redisfunctions";
import { printErrorString } from "../../utils/utilityfunctions";
import Prisma from "../Prisma";
export interface IAddUserModel {
  emailId: string;
  id: string;
  profilePicture: string;
  name:string
}

export const AddUserModel = async (
  user: string,
  connRequest: string
): Promise<IAddUserModel | null> => {
  //check if exists

  let redisConnValue = await getDatafromUsers(user);

  if (redisConnValue !== null) {
    return {
      emailId: redisConnValue.emailId,
      id: redisConnValue.id,
      profilePicture: redisConnValue.profilePicture,
      name:redisConnValue.name
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
      //@ts-ignore
      delete (userDetails.connections);
      return userDetails;
    }
  } catch (error) {
    printErrorString(error);
  }

  return null;
};
