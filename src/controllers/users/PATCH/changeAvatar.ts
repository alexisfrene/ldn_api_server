import { Request, Response } from "express";
import { getSecureUrl, uploadToCloudinary, db } from "@lib";

const User = db.User;

export const changeAvatar = async (req: Request, res: Response) => {
  const user_id = req.user;
  const file = req.file;
  if (!user_id) return res.status(400).json({ error: "Falta user_id" });
  const user = await User.findByPk(user_id);
  if (!file)
    return res
      .status(400)
      .json({ error: true, message: "No se mando una imagen" });
  const public_id = await uploadToCloudinary(file, `${user_id}/avatar`, 64, 64);
  if (!public_id)
    return res
      .status(400)
      .json({ error: true, message: "Error al subir la imagen" });
  const url = getSecureUrl(`avatar/${public_id}`, user_id);
  await user.update({ avatar_url: url });
  return res.status(200).json({ error: false, message: "Todo oK", url });
};
