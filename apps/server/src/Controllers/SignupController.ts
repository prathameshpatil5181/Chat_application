import { Request, Response } from "express";
import { ResultTypes } from "ioredis/built/utils/RedisCommander";
import { authclass } from "../Models/authModels";



export const SignupController = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const user = new authclass(email, password, name);
  try {
    const userData = await user.signUpUser();
    if (userData === "user already exist") {
      res.status(400).json({ status: userData });
      console.log("test");
      return;
    }
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 2);
    res
      .cookie("token", userData, { httpOnly: true, expires: expirationDate })
      .status(200)
      .json({
        message: "User Created successfully",
        sucess:true,
        token:userData
      });
  } catch (error) {
    throw error;
  }
};
