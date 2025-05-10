import { Request, Response } from "express";
import { models } from "@lib";
import { cleanObject } from "@utils";

const Product = models.Product;
const Category = models.Category;
const Size = models.Size;

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
  if (product) {
    if (propertiesToEdit?.price) {
      propertiesToEdit.price = Number(propertiesToEdit.price);
    }
    let nameProps = { category: "", size: "" };
    if (propertiesToEdit?.category_id && propertiesToEdit?.category_value) {
      const newCategory = await Category.findByPk(propertiesToEdit.category_id);
      if (newCategory) {
        const valuesNewCategory = newCategory.values.find(
          (value) => value.id === propertiesToEdit.category_value,
        );

        if (!valuesNewCategory) {
          return res.status(400).json({ error: "Categoría invalida" });
        }
        nameProps.category = valuesNewCategory.value;
      }
    }
    if (propertiesToEdit?.size_id && propertiesToEdit?.size_value) {
      const newSize = await Size.findByPk(propertiesToEdit.size_id);
      if (newSize) {
        const valuesNewSize = newSize.values.find(
          (value) => value.id === propertiesToEdit.size_value,
        );
        if (!valuesNewSize) {
          return res.status(400).json({ error: "Talla/numero invalida" });
        }
        nameProps.size = valuesNewSize.value;
      }
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
  } else {
    return res.status(400).json({
      error: true,
      message: "Producto no encontrado",
    });
  }
};
