import { Request, Response } from "express";
import axios from "axios";
import { Uuid } from "types";
import { models, sequelize } from "@lib";
import { uploadToMinio } from "@lib/minio";

const { Product, Category, Size, Detail } = models;

export const createProducts = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File;
    const user_id = req.user as Uuid;
    if (!user_id) return res.status(400).json({ error: "Falta ID de usuario" });
    if (!file)
      return res.status(400).json({ error: "Falta imagen del producto" });

    const {
      name = "",
      description = "",
      price = 1,
      stock = 1,
      category_id,
      category_value,
      size_id,
      size_value,
      detail = {},
    } = req.body;

    const productPrice = Number(price);
    if (isNaN(productPrice) || productPrice <= 0) {
      return res.status(400).json({ error: "Precio inválido" });
    }

    const detailData = {
      gender: detail.gender || "unspecified",
      color: detail.color || "unspecified",
      style: detail.style || "unspecified",
      age: detail.age || "unspecified",
      brand_id: detail.brand || null,
    };

    const newProductData = {
      name,
      description,
      price: productPrice,
      stock,
      primary_image: "",
      category_id: 1,
      category_value: "",
      size_id: 1,
      size_value: "100",
      state: true,
      discount: 0,
      dollar_today: 1,
      user_id,
      DetailProduct: detailData,
    };

    if (category_id) {
      const category = await Category.findByPk(category_id);
      if (
        category?.values?.some(
          (value: { id: string }) => value.id === category_value,
        )
      ) {
        newProductData.category_id = category_id;
        newProductData.category_value = category_value;
      }
    }

    if (size_id) {
      const size = await Size.findByPk(size_id);
      if (
        size?.values?.some((value: { id: string }) => value.id === size_value)
      ) {
        newProductData.size_id = size_id;
        newProductData.size_value = size_value;
      }
    }

    const image_url = await uploadToMinio(file, `${user_id}/products`, user_id);
    if (!image_url) {
      return res.status(400).json({ error: "Error subiendo imagen" });
    }
    newProductData.primary_image = image_url;

    try {
      const { data } = await axios.get(
        "https://dolarapi.com/v1/dolares/contadoconliqui",
      );
      newProductData.dollar_today = Math.floor(Number(data?.venta)) || 1;
    } catch {
      console.warn(
        "No se pudo obtener el valor del dólar, usando 1 por defecto.",
      );
    }

    const transaction = await sequelize.transaction();
    try {
      const newProduct = await Product.create(newProductData, {
        include: [{ model: Detail, as: "DetailProduct" }],
        transaction,
      });

      await transaction.commit();
      return res.status(201).json(newProduct);
    } catch (error) {
      await transaction.rollback();
      console.error("Error al crear el producto:", error);
      return res.status(500).json({ error: "Error al crear el producto" });
    }
  } catch (error) {
    console.error("Error en createProducts:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
