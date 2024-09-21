import { Request, Response } from "express";
import { cleanObject, isNumber } from "../../../utils";
import { uploadToCloudinary, db, deleteImageToCloudinary } from "../../../lib";
import { asyncHandler } from "../../../middleware";

const Product = db.Product;
const Detail = db.Detail;
const Category = db.Category;
const Size = db.Size;
const Variation = db.Variation;

export const editProductDetails = asyncHandler(
  async (req: Request, res: Response) => {
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
  }
);

export const editProductData = asyncHandler(
  async (req: Request, res: Response) => {
    const propertiesToEdit = cleanObject(req.body, [
      "price",
      "category_id",
      "category_value",
      "size_id",
      "size_value",
      "name",
      "description",
    ]);
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
  }
);

export const changeImageProduct = asyncHandler(
  async (req: Request, res: Response) => {
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
  }
);

export const linkVariation = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;
    const variationId = req.query.variation_id;
    if (!variationId)
      return res
        .status(400)
        .json({ error: true, message: "NO se paso id de la variación" });
    const variation = await Variation.findByPk(variationId);
    if (!variation)
      return res
        .status(400)
        .json({ error: true, message: "NO encontró la variación" });
    const product = await Product.findByPk(productId);
    if (!product)
      return res
        .status(400)
        .json({ error: true, message: "NO encontró el producto" });
    await product.update({ variation_id: variation.variation_id });

    return res
      .status(200)
      .json({ error: false, message: "Se ligo la variación !" });
  }
);
