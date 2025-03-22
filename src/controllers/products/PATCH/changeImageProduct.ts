import { Request, Response } from "express";
import { models } from "@lib";
import { deleteFromMinio, uploadToMinio } from "@lib/minio";

const Product = models.Product;

export const changeImageProduct = async (req: Request, res: Response) => {
  const userId = req.user;

  if (!userId) new Error("User no autorizado");
  const file = req.file as Express.Multer.File;
  if (!file) return new Error("fatal image");
  const image_url = await uploadToMinio(file, `${userId}/products`, userId);

  if (!image_url)
    res.status(400).json({ error: true, message: "Error al subir la imagen" });
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await deleteFromMinio(product.primary_image, `${userId}/products`);
    await product.update({ primary_image: image_url });
    return res.status(200).json({ error: false });
  }
  res.status(400).json({ error: true, message: "Error al subir la imagen" });
};
