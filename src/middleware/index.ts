import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db from "../lib/sequelize";
import { Uuid } from "../types";

const User = db.User;

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Unauthorized: Missing token" });

  const decodedToken = jwt.decode(token) as { user_id: Uuid } | null;

  if (!decodedToken)
    return res.status(401).json({ message: "Unauthorized : Missing token" });

  const sessionTokenByUser = await User.findByPk(decodedToken.user_id);

  if (sessionTokenByUser?.dataValues.session_token !== token)
    return res.status(401).json({ message: "Unauthorized : Missing token" });

  return jwt.verify(
    token,
    process.env.JWT_SECRET || "",
    { algorithms: ["HS256"] },
    async (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      req.body.user_id = decodedToken.user_id;

      return next();
    }
  );
};
