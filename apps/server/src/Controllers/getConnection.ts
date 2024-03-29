import { getConnectionsSocket } from "../Models/storeUserMessage";
import { Request, Response, NextFunction } from "express";
interface DecodedToken {
  userId: string;
  username: string;
  // Add more properties as needed
}

export interface CustomRequest extends Request {
  user?: DecodedToken; // Define the user property
}
export const getConnections = async (req: Request, res: Response) => {
  const userId = req.body.user;

  console.log(userId);
  if (userId) {
    const userConnections = await getConnectionsSocket(userId.email);
    //@ts-ignore
    const userIds = userConnections.connections.split(" ");
    return res.status(200).json({
      connections: userIds,
    });
  }
  return res.status(404).json({
    status: false,
  });
};
