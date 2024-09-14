import { Request, Response } from "express";
import axios from "axios";
import db from "../../../lib/sequelize";
import { uploadToCloudinary } from "../../../lib";

const Product = db.Product;
const Category = db.Category;
const Size = db.Size;
const Detail = db.Detail;

export const createProducts = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File;
    const user_id = req.user;
    if (!user_id) return new Error("Falta id user");
    if (!file) return new Error("fatal image");
    req.body.price = Number(req.body.price);
    const data = req.body;
    const dataNewProduct: Record<string, any> = {};
    const detail = data?.detail;
    const newDetails = await Detail.create({
      gender: detail?.gender || "unspecified",
      color: detail?.color || "unspecified",
      brand: detail?.brand || "unspecified",
      style: detail?.style || "unspecified",
      age: detail?.age || "unspecified",
    });
    if (!newDetails)
      return res
        .status(400)
        .json({ error: "No se pudo crear los detalles del producto" });
    dataNewProduct["detail_id"] = newDetails.detail_id;
    if (data.category_id) {
      const category = await Category.findByPk(data.category_id, { raw: true });
      if (category.values.length) {
        const verifyCategory = category.values.find(
          (value: { id: string }) => value.id === data.category_value
        );

        if (verifyCategory) {
          dataNewProduct["category_id"] = data.category_id;
          dataNewProduct["category_value"] = data.category_value;
        }
      }
    }
    if (data.size_id) {
      const size = await Size.findByPk(data.size_id, { raw: true });
      if (size.values.length) {
        const verifyCategory = size.values.find(
          (value: { id: string }) => value.id === data.size_value
        );
        if (verifyCategory) {
          dataNewProduct["size_id"] = data.size_id;
          dataNewProduct["size_value"] = data.size_value;
        }
      }
    }
    const image_url = await uploadToCloudinary(file, user_id);
    if (!image_url)
      return res
        .status(400)
        .json({ error: "No se pudo subir la imagen a cloud" });
    dataNewProduct["name"] = data.name;
    dataNewProduct["description"] = data.description;
    dataNewProduct["primary_image"] = image_url;
    dataNewProduct["price"] = data.price;
    dataNewProduct["user_id"] = user_id;

    const dollarBlue: { data: { venta: string } } = await axios.get(
      "https://dolarapi.com/v1/dolares/contadoconliqui"
    );
    dataNewProduct["dollar_today"] =
      Math.floor(Number(dollarBlue.data?.venta)) || 1;
    const newProduct = await Product.create(dataNewProduct);

    return res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msj: "err" });
  }
};
