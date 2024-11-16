import { Request, Response } from "express";
import axios from "axios";
import { uploadToCloudinary, models, sequelize } from "@lib";
import { Uuid } from "types";

const { Product, Category, Size, Detail } = models;

export const createProducts = async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;
  const user_id = req.user;
  if (!user_id) return res.status(400).json({ error: "Falta id de usuario" });
  if (!file)
    return res.status(400).json({ error: "Falta imagen del producto" });

  req.body.price = Number(req.body.price);

  const data = req.body;

  const detail = {
    gender: data?.detail?.gender || "unspecified",
    color: data?.detail?.color || "unspecified",
    brand: data?.detail?.brand || "unspecified",
    style: data?.detail?.style || "unspecified",
    age: data?.detail?.age || "unspecified",
  };

  const dataNewProduct = {
    category_value: "",
    description: data.description || "",
    discount: 0,
    dollar_today: 0,
    name: data.name || "",
    price: data.price || 1,
    primary_image: "",
    size_value: 100,
    state: true,
    stock: data.stock || 1,
    category_id: 1,
    user_id: user_id as Uuid,
    size_id: 1,
    DetailProduct: detail,
  };

  if (data.category_id) {
    const category = await Category.findByPk(data.category_id);
    if (category) {
      const verifyCategory = category.values.find(
        (value: { id: string }) => value.id === data.category_value
      );
      if (verifyCategory) {
        dataNewProduct.category_id = data.category_id;
        dataNewProduct.category_value = data.category_value;
      }
    }
  }

  if (data.size_id) {
    const size = await Size.findByPk(data.size_id);
    if (size) {
      const verifySize = size.values.find(
        (value) => value.id === data.size_value
      );
      if (verifySize) {
        dataNewProduct.size_id = data.size_id;
        dataNewProduct.size_value = data.size_value;
      }
    }
  }

  const image_url = await uploadToCloudinary(file, user_id);
  if (!image_url)
    return res
      .status(400)
      .json({ error: "Error subiendo imagen a Cloudinary" });
  dataNewProduct.primary_image = image_url;

  const dollarBlue: { data: { venta: string } } = await axios.get(
    "https://dolarapi.com/v1/dolares/contadoconliqui"
  );
  dataNewProduct.dollar_today = Math.floor(Number(dollarBlue.data?.venta)) || 1;

  const transaction = await sequelize.transaction();

  const newProduct = await Product.create(dataNewProduct, {
    include: [{ model: Detail, as: "DetailProduct" }],
    transaction,
  });

  if (newProduct) {
    await transaction.commit();
    return res.status(200).json(newProduct);
  } else {
    await transaction.rollback();
    return res
      .status(400)
      .json({ error: true, message: "Error al crear el producto" });
  }
};
