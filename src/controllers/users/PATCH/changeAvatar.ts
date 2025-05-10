import { Request, Response } from "express";
import { models } from "@lib";
import { uploadToMinio } from "@lib/minio";
import { env } from "config/environment";

const User = models.User;

export const changeAvatar = async (req: Request, res: Response) => {
  const user_id = req.user;
  const file = req.file;
  if (!user_id) return res.status(400).json({ error: "Falta user_id" });
  const user = await User.findByPk(user_id);
  if (!file)
    return res
      .status(400)
      .json({ error: true, message: "No se mando una imagen" });
  const public_id = `${
    env === "production" ? "https" : req.protocol
  }://${req.get("host")}/api/user/images/${file.filename}`;
  await uploadToMinio(file, `${user_id}/user`, user_id);
  if (!public_id)
    return res
      .status(400)
      .json({ error: true, message: "Error al subir la imagen" });

  if (user) await user.update({ avatar_url: public_id || "" });
  return res.status(200).json({ error: false, message: "Todo oK", public_id });
};
