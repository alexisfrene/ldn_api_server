import { Request, Response } from "express";
import { cleanObject, isNumber } from "@utils";
import { db } from "@lib";

const Product = db.Product;
const Category = db.Category;
const Size = db.Size;

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
};
