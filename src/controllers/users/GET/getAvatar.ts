import { Request, Response } from "express";
import { models } from "@lib";

const User = models.User;

export const getAvatar = async (req: Request, res: Response) => {
  const user_id = req.user;

  if (user_id) {
    const avatar = await User.findByPk(user_id);
    if (avatar) {
      return res.status(200).json(avatar.avatar_url);
    }
  }

  return res.status(401).json({ error: "Falta token" });
};
