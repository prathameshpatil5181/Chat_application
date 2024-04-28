import { Router } from "express";
import { getConnections } from "../Controllers/UserContrllers/getConnection";
import { authMiddleware } from "../middleware/authMiddleware";
import { AddConnections } from "../Controllers/UserContrllers/AddConnections";
import { groupController } from "../Controllers/GroupController/GroupContrller";
import { InsertMessage } from "../Models/MessageModels/MessageModel";
import { getMessagesController } from "../Controllers/UserContrllers/getMessages";
import { getGroups } from "../Controllers/GroupController/GroupContrller";


const userRouter = Router();

userRouter.get("/getConnection", authMiddleware, getConnections);
userRouter.post("/addUser", authMiddleware, AddConnections);
userRouter.post("/creategroup", authMiddleware, groupController);
userRouter.get("/getGroups",authMiddleware,getGroups)
userRouter.post("/getmessages",authMiddleware, getMessagesController);
userRouter.post("/addmessageTest", async (req, res) => {
  try {
    const user = req.body.user;
    const message: string = req.body.message;
    const to: string = req.body.to;

    if (!user || !message || !to) {
      console.log(`user : ${user}`);
      console.log(`members : ${message}`);
      console.log(`to : ${to}`);
      res.status(400).json({
        success: false,
        result: "wrong body structure",
      });
      return;
    }
    const result = await InsertMessage(
        message,
        "message",
        user,
        to
    );

    if (result.success == true) {
      res.status(200).json(result);
      return;
    }

    res.status(400).json(result);
    return;
  } catch (error) {
    console.log("error in message");
  }
});
export default userRouter;
