import { Request, Response } from "express";
import db from "../../../lib/sequelize";
import { v4 as uuidv4 } from "uuid";
import { uploadToCloudinary } from "../../../lib";

const User = db.User;
const Variation = db.Variation;
const Category = db.Category;
const Product = db.Product;

export const createVariation = async (req: Request, res: Response) => {
  try {
    const { title, label, user_id, category_id, category_value } = req.body;
    const files = req.files as Express.Multer.File[];
    if (!files)
      return res
        .status(400)
        .json({ error: true, message: "No se paso imágenes" });
    const user = await User.findByPk(user_id);
    if (!user)
      return res
        .status(400)
        .json({ error: true, message: "Usuario no autorizado" });
    let newVariation: Record<string, any> = {};
    if (category_id) {
      const category = await Category.findByPk(category_id);
      if (category.values.length) {
        const verifyCategory = category.values.find(
          (value: { id: string }) => value.id === category_value
        );
        if (verifyCategory) {
          newVariation["category_id"] = category_id;
          newVariation["category_value"] = category_value;
        }
      }
    }
    const uploadPromises = files.map(async (file) => {
      const image_url = await uploadToCloudinary(file, `${user_id}/variations`);

      return image_url;
    });
    const images = await Promise.all(uploadPromises);
    newVariation["title"] = title;
    newVariation["values"] = [{ id: uuidv4(), label, images }];
    newVariation["user_id"] = user_id;
    const variation = await Variation.create(newVariation);

    return res.status(200).json({ variation });
  } catch (error) {
    console.log("Error en crear un producto:", error);
    return res.status(500).json({ error: true, message: error });
  }
};

export const insertVariants = async (req: Request, res: Response) => {
  try {
    const productId = req.query.product_id;
    const variationId = req.params.id;
    const variation = await Variation.findByPk(variationId);
    if (!variation)
      return res
        .status(400)
        .json({ error: true, message: "No se encontró la variación" });
    const product = await Product.findByPk(productId);
    if (!product)
      return res
        .status(400)
        .json({ error: true, message: "User no autorizado" });
    await product.update({ variation_id: variationId });
    return res.status(200).json({ error: false, message: "Todo child" });
  } catch (error) {
    console.log("Error en insertar ID de imágenes de variantes:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
