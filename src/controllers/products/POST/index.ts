import { Request, Response } from "express";
import { Product } from "../../../lib/sequelize/models";

export const createProducts = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const testProduct = {
      name: "Nombre",
      description: "descripción",
      price: 9999,
      user_id: "fe2f979a-be7c-4e57-8068-57a5004d8baf",
    };
    const newProduct = await Product.create(testProduct);

    return res.status(200).json({ newProduct });
  } catch (error) {
    return res.status(400).json({ msj: "err" });
  }
};
