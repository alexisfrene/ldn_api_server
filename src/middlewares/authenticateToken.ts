import { jwtSecret } from "config/environment";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Uuid } from "../types";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Unauthorized: Missing token" });

  const decodedToken = jwt.decode(token) as { user_id: Uuid } | null;

  if (!decodedToken)
    return res.status(401).json({ message: "Unauthorized : Missing token" });

  return jwt.verify(
    token,
    jwtSecret || "",
    { algorithms: ["HS256"] },
    async (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      req.user = decodedToken.user_id;

      return next();
    },
  );
};
