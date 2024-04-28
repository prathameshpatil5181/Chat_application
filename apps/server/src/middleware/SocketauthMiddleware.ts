import * as http from "http";
import cookie from "cookie";
export interface CustomIncomingMessage extends http.IncomingMessage {
  username: string;
}

const jwt = require("jsonwebtoken");

export const userNameparse = (
  req: http.IncomingMessage
): { id: string; email: string }|string => {
  if (typeof req.headers.cookie !== "string") return "Unauthorized";
  const token = cookie.parse(req.headers.cookie);

  try {
    // Verify the JWT token and decode it
    const decodedToken = jwt.verify(token.token, process.env.JWT_SECRET_KEY);
    // Attach the decoded token to the request object
    return decodedToken;
  } catch (error) {
    console.log("error in parsing the request");
    return "error in parsing the request";
  }
};
