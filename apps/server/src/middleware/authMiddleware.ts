import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

interface DecodedToken {
  userId: string;
  username: string;
  // Add more properties as needed
}

interface CustomRequest extends Request {
  user?: DecodedToken; // Define the user property
}
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the JWT token from the request cookie or header
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
  try {
    // Verify the JWT token and decode it
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Attach the decoded token to the request object
    req.body.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};
