import { Request, Response } from "express";
import { loginClass } from "../classes/loginClass";

const jwt = require("jsonwebtoken");

export const LoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const loginUser = new loginClass(email, password);
  const token = await loginUser.login();
  if (token === false) {
    res
      .status(401)
      .json({ message: "Invalid email or password", success: false });
    return;
  }
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 2);
  res.cookie("token", token, { httpOnly: true, expires: expirationDate });
  res
    .status(200)
    .json({
      message: "User logged in successfully",
      success: true,
      auth: token,
    });
};
