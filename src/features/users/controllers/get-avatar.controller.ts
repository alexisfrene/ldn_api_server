import { Request, Response } from "express";
import { getAvatarService } from "../services/get-avatar.services";

export const getAvatar = async (req: Request, res: Response) => {
  const user_id = req.user;
  const result = await getAvatarService(user_id);
  return res.status(result.status).json(result.body);
};
