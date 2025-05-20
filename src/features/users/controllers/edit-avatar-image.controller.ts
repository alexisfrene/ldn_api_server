import { Request, Response } from "express";
import { changeAvatarService } from "../services/edit-avatar-image.services";

export const changeAvatar = async (req: Request, res: Response) => {
  const user_id = req.user;
  const file = req.file;
  const result = await changeAvatarService(user_id, file, req);
  return res.status(result.status).json(result.body);
};
