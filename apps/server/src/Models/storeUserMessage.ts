import { error } from "console";
import Prisma from "./Prisma";
export const storeSocketConnections = async (
  SocketId: string,
  userName: string
) => {

  try{

    const user = await Prisma.socketConnections.findUnique({ 
      where:{
        userName:userName,
      }
     });

     if(user){
      await Prisma.socketConnections.update({
        data:{
          socketId:SocketId,
          status:true
        },
        where:{
          userName:userName
        }
      })

      return;
     }

     await Prisma.socketConnections.create({
      data:{
        userName:userName,
        socketId:SocketId,
        status:true
      }
    })

      return;

  }
  catch(error){
    throw error
  }


};

export const getUserSocketId =async(userName:string):Promise<string|string[]>=>{
  try{

    const user = await Prisma.socketConnections.findUnique({ 
      where:{
        userName:userName,
      }
     });

     if(user){
      return user.socketId;
     }
  
    return 'User not online';
  }
  catch(error) {throw error;}
}

export const getConnectionsSocket = async(email:string)=>{

  try{

    const user = await Prisma.userCredentials.findUnique({ 
      select: {
        connections:true
      },
      where:{
        emailId:email,
      }
     });

    if (user) {
      const userIds = user.connections;
      const userData = await getuserdata(userIds);
      return userData;
     }
  
    return 'User not Found';
  }
  catch(error) {throw error;}

}

export const getuserdata = async (userName: string[]) => {
  try{

    const user = await Prisma.userCredentials.findMany({
      select: {
        emailId: true,
        name: true,
        id: true,
        profilePicture:true
      },
      where: {
        emailId: {
          in: userName
          }
      },
    });

  
    if (user) {
      return user;
     }
  
    return 'User not Found';
  }
  catch(error) {throw error;}

}
