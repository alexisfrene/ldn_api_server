import { Request, Response } from "express";
import { cleanObject, isNumber } from "../../../utils";
import db from "../../../lib/sequelize";
import { uploadToCloudinary } from "../../../lib";
import { deleteImageToCloudinary } from "../../../lib/cloudinary";

const Product = db.Product;
const Detail = db.Detail;
const Category = db.Category;
const Size = db.Size;

export const editProductDetails = async (req: Request, res: Response) => {
  const propertiesToEdit = cleanObject(req.body, [
    "gender",
    "color",
    "brand",
    "style",
    "age",
  ]);

  if (!req.params.id) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    let selectorDetails = await product?.getDetail();
    if (!selectorDetails) {
      const newDetail = await Detail.create();
      await product.update({ detail_id: newDetail.detail_id });
      selectorDetails = await product?.getDetail();
    }
    const details = await Detail.findByPk(selectorDetails.detail_id);
    if (!details) {
      return res.status(404).json({ error: "Details not found" });
    }
    const updateDetails = await details.update(propertiesToEdit);

    return res.status(200).json(updateDetails);
  } catch (error) {
    console.error("Error while editing product details:", error);

    return res
      .status(500)
      .json({ error: "An error occurred while editing the product details" });
  }
};

export const editProductData = async (req: Request, res: Response) => {
  const propertiesToEdit = cleanObject(req.body, [
    "price",
    "category_id",
    "category_value",
    "size_id",
    "size_value",
    "name",
    "description",
  ]);
  try {
    const product = await Product.findByPk(req.params.id);
    if (propertiesToEdit?.price) {
      if (typeof propertiesToEdit.price !== "number") {
        if (isNumber(propertiesToEdit.price)) {
          propertiesToEdit.price = Number(propertiesToEdit.price);
        } else {
          return res.status(400).json({
            error: "Se paso algo invalido para el valor de precio del producto",
          });
        }
      }
    }
    let nameProps = { category: "", size: "" };

    if (propertiesToEdit?.category_id && propertiesToEdit?.category_value) {
      const newCategory = await Category.findByPk(propertiesToEdit.category_id);
      const valuesNewCategory = newCategory.values.find(
        (value: { id: string }) => value.id === propertiesToEdit.category_value
      );

      if (!valuesNewCategory) {
        return res.status(400).json({ error: "Categoría invalida" });
      }
      nameProps.category = valuesNewCategory.value;
    } else {
      const category = await Category.findByPk(product.category_id);
      const value = category.values.find(
        (value: { id: string }) => value.id === product.category_value
      );
      nameProps.category = value.value;
    }
    if (propertiesToEdit?.size_id && propertiesToEdit?.size_value) {
      const newSize = await Size.findByPk(propertiesToEdit.size_id);
      const valuesNewSize = newSize.values.find(
        (value: { id: string }) => value.id === propertiesToEdit.size_value
      );

      if (!valuesNewSize) {
        return res.status(400).json({ error: "Talla/numero invalida" });
      }
      nameProps.size = valuesNewSize.value;
    } else {
      const size = await Size.findByPk(product.size_id);
      const value = size.values.find(
        (value: { id: string }) => value.id === product.size_value
      );
      nameProps.size = value.value;
    }

    const updateDataProduct = await product.update(propertiesToEdit);

    return res.status(200).json({
      name: updateDataProduct.name,
      category: nameProps.category,
      description: updateDataProduct.description,
      price: updateDataProduct.price,
      product_id: updateDataProduct.product_id,
      size: nameProps.size,
    });
  } catch (error) {
    console.log("Error al editar los detalles del producto", error);

    return res.status(500).json("Error in delete editProductData");
  }
};

export const changeImageProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user_id;
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
    const updateProduct = await product.update({ primary_image: image_url });
    return res.status(200).json({ error: false, data: updateProduct });
  } catch (error) {
    console.log("Error in --> changeImageProduct", error);
    return res.status(500).json({ error: true, message: error });
  }
};

export const linkVariation = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const variationId = req.query.variation_id;
  try {
    //Primero validar , que el id producto y de la variación sea valido
    //Segundo ligar el id
    return res.status(200).json({ productId, variationId: variationId });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Error in link variation" });
  }
};
