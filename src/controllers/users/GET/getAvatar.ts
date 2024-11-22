import { Request, Response } from "express";
import { models } from "@lib";

const User = models.User;

export const getAvatar = async (req: Request, res: Response) => {
  const user_id = req.user;

  if (user_id) {
    const userSelected = await User.findByPk(user_id);
    if (userSelected) {
      return res.status(200).json({
        avatar_url: userSelected.avatar_url,
        username: userSelected.username,
        email: userSelected.email,
      });
    }
  }

  return res.status(401).json({ error: "Falta token" });
};
