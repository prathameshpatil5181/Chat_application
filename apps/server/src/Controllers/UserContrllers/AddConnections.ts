import { Request, Response } from "express";
import { addUser } from "../../Models/SearchModel";

export const AddConnections = async (req: Request, res: Response) => {
  const userId = req.body.user;
  console.log(userId);
  const result = await addUser(userId.email, req.body.addUser);


  

  if (result === true) {
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(500).json({
      success: false,
    });
  }
};
