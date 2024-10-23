import { Request, Response } from "express";
import { uploadToCloudinary, db, deleteImageToCloudinary } from "@lib";

const Product = db.Product;

export const changeImageProduct = async (req: Request, res: Response) => {
  const userId = req.user;

  if (!userId) return new Error("User no autorizado");
  const file = req.file as Express.Multer.File;
  if (!file) return new Error("fatal image");
  const image_url = await uploadToCloudinary(file, userId);

  if (!image_url)
    return res
      .status(400)
      .json({ error: true, message: "Error al subir la imagen" });
  const product = await Product.findByPk(req.params.id);
  await deleteImageToCloudinary(`${userId}/${product.primary_image}`);
  await product.update({ primary_image: image_url });
  return res.status(200).json({ error: false });
};
