import axios from "axios";
import { Uuid } from "types";
import { uploadToMinio } from "@lib/minio";
import { models, sequelize } from "@lib/sequelize";

const { Product, Category, Size, Detail } = models;

export const createProductsService = async (
  user_id: Uuid,
  file: Express.Multer.File,
  body: any,
) => {
  if (!user_id) return { status: 400, body: { error: "Falta ID de usuario" } };
  if (!file)
    return { status: 400, body: { error: "Falta imagen del producto" } };

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
  } = body;

  const productPrice = Number(price);
  if (isNaN(productPrice) || productPrice <= 0) {
    return { status: 400, body: { error: "Precio inválido" } };
  }

  const detailData = {
    gender: detail.gender || "unspecified",
    color: detail.color || "unspecified",
    style: detail.style || "unspecified",
    age: detail.age || "unspecified",
    brand_id: detail.brand || null,
  };

  const newProductData: any = {
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
    return { status: 400, body: { error: "Error subiendo imagen" } };
  }
  newProductData.primary_image = image_url;

  try {
    const { data } = await axios.get(
      "https://dolarapi.com/v1/dolares/contadoconliqui",
    );
    newProductData.dollar_today = Math.floor(Number(data?.venta)) || 1;
  } catch {
    // No se pudo obtener el valor del dólar, usando 1 por defecto.
  }

  const transaction = await sequelize.transaction();
  try {
    const newProduct = await Product.create(newProductData, {
      include: [{ model: Detail, as: "DetailProduct" }],
      transaction,
    });

    await transaction.commit();
    return { status: 201, body: newProduct };
  } catch (error) {
    await transaction.rollback();
    return { status: 500, body: { error: "Error al crear el producto" } };
  }
};
