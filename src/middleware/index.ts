import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }
  return jwt.verify(token, process.env.JWT_SECRET || "", (err) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    return next();
  });
};
