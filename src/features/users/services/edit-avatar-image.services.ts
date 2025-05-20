import { env } from "config/environment";
import { uploadToMinio } from "@lib/minio";
import { models } from "@lib/sequelize";

const User = models.User;

export const changeAvatarService = async (
  user_id: string,
  file: Express.Multer.File,
  req: any,
) => {
  if (!user_id) return { status: 400, body: { error: "Falta user_id" } };
  const user = await User.findByPk(user_id);
  if (!file)
    return {
      status: 400,
      body: { error: true, message: "No se mando una imagen" },
    };
  const public_id = `${
    env === "production" ? "https" : req.protocol
  }://${req.get("host")}/api/user/images/${file.filename}`;
  await uploadToMinio(file, `${user_id}/user`, user_id);
  if (!public_id)
    return {
      status: 400,
      body: { error: true, message: "Error al subir la imagen" },
    };

  if (user) await user.update({ avatar_url: public_id || "" });
  return { status: 200, body: { error: false, message: "Todo oK", public_id } };
};
