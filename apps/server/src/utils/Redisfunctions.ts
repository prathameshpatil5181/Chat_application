import { Redisclient } from "../classes/RedisClass";

export interface userConn {
  emailId: string;
  id: string;
  profilePicture: string;
  connections: string[];
  name:string
}

export const getDatafromUsers = async (
  user: string
): Promise<userConn | null> => {


    // check if user exists
    console.log("getting data from redis");

  let userDetails = await Redisclient.hget("Chatuser", user);

  if (userDetails !== null) return JSON.parse(userDetails) as userConn;
  else return null;
};

export const storeInUsers = async (data:userConn):Promise<void> => {

    let result = await Redisclient.hset("Chatuser",data.emailId,JSON.stringify(data));
    console.log(result);
}

export const deleteInUser = async (data: string): Promise<void> => {
  
}
