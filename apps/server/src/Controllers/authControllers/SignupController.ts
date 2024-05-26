import { Request, Response } from "express";
import { ResultTypes } from "ioredis/built/utils/RedisCommander";
import { authclass } from "../../Models/authModels/authModels";

export const SignupController = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const user = new authclass(email, password, name);
  try {
    const userData = await user.signUpUser();
    if (userData.result === false) {
      res
        .status(400)
        .json({ result: userData.result, status: userData.status });
      return;
    }
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 2);
    res.cookie("token", userData.status, {
        httpOnly: true,
        expires: expirationDate,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        result: true,
        token: userData.status,
      });
  } catch (error) {
    throw error;
  }
};
