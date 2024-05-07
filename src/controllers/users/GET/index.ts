import { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  user_id: string;
}

export const getUserId = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (typeof token === "string") {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "", {
        algorithms: ["HS256"],
      }) as DecodedToken;

      return res.status(200).json({ user_id: decodedToken.user_id });
    }

    return res.status(401).json({ error: "Token not provided" });
  } catch (error: any) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    return res.status(401).json({ error });
  }
};
