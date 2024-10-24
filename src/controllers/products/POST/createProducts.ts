import { Request, Response } from "express";
import axios from "axios";
import { uploadToCloudinary, models } from "@lib";
import { ProductAttributes, ProductCreationAttributes } from "@models/Products";
import { Uuid } from "types";

const Product = models.Product;
const Category = models.Category;
const Size = models.Size;
const Detail = models.Detail;

export const createProducts = async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;
  const user_id = req.user;
  if (!user_id) return new Error("Falta id user");
  if (!file) return new Error("fatal image");
  req.body.price = Number(req.body.price);
  const data = req.body;
  const dataNewProduct: ProductCreationAttributes = {
    category_value: "",
    code: 1,
    description: "",
    discount: 0,
    dollar_today: 0,
    name: "",
    price: 1,
    primary_image: "",
    size_value: "",
    state: true,
    stock: 1,
    detail_id: "" as Uuid,
    category_id: "" as Uuid,
    user_id: "" as Uuid,
    size_id: "" as Uuid,
  };
  const detail: {
    gender: "male" | "female" | "unspecified";
    color: string;
    brand: string;
    style: string;
    age: string;
  } = data?.detail;

  const newDetails = Detail.build({
    gender: detail?.gender || "unspecified",
    color: detail?.color || "unspecified",
    brand: detail?.brand || "unspecified",
    style: detail?.style || "unspecified",
    age: detail?.age || "unspecified",
    product_id: "" as Uuid,
  });
  if (!newDetails)
    return res
      .status(400)
      .json({ error: "No se pudo crear los detalles del producto" });
  dataNewProduct["detail_id"] = newDetails.detail_id;
  if (data.category_id) {
    const category = await Category.findByPk(data.category_id, { raw: true });
    if (category) {
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
    if (size) {
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
  const newProduct: ProductAttributes = await Product.create(dataNewProduct);

  newDetails.product_id = newProduct.product_id as Uuid;
  await newDetails.save();

  return res.status(200).json(newProduct);
};
