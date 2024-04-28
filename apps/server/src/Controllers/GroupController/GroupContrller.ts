import { Request, Response } from "express";
import {
  createGroupModel,
  getAllUserGroups,
} from "../../Models/GroupModels/GroupModel";
import { IcreateGroupModel } from "../../Models/GroupModels/GroupModel";
export const groupController = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const members: string[] = req.body.members;
    const name: string = req.body.name;

    if (!user || !members || !name) {
      console.log(`user : ${user}`);
      console.log(`members : ${members}`);
      console.log(`name : ${name}`);
      res.status(400).json({
        success: false,
        result: "wrong body structure",
      });
      return;
    }

    console.log(req.body);
    const result: IcreateGroupModel = await createGroupModel(
      members,
      user.id,
      name
    );

    if (result.success == true) {
      res.status(200).json(result);
      return;
    }

    res.status(400).json(result);
    return;
  } catch (error) {
    console.log("error in group on");
  }
  /*req body structure
    {
        members:[]
        user:string id
        name:string
        createdBy:user
        Admin:user
    }
 */

  //return the response with success or fail
  // {
  // Success:boolean
  // }
};

export const getGroups = async (req: Request, res: Response) => {
  const user = req.body.user.id;

  const result = await getAllUserGroups(user);

  if (result.success === false) {
    res.status(400).json(result);
    return;
  }

  res.status(200).json(result);
  return;
};
