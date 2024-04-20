import { Router } from "express";
import { getConnections } from "../Controllers/UserContrllers/getConnection";
import { authMiddleware } from "../middleware/authMiddleware";
import { AddConnections } from "../Controllers/UserContrllers/AddConnections";
const userRouter = Router();

userRouter.get("/getConnection", authMiddleware, getConnections);
userRouter.post("/addUser",authMiddleware,AddConnections);

export default userRouter;