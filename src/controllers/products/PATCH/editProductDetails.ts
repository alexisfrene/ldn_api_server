import { Request, Response } from "express";
import { cleanObject } from "@utils";
import { models } from "@lib";

const Product = models.Product;
const Detail = models.Detail;

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
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  let selectorDetails = await product?.getDetailProduct();
  if (!selectorDetails) {
    const newDetail = await Detail.create();
    await product.update({ detail_id: newDetail.detail_id });
    selectorDetails = await product?.getDetailProduct();
  }
  const details = await Detail.findByPk(selectorDetails.detail_id);
  if (!details) {
    return res.status(404).json({ error: "Details not found" });
  }
  const updateDetails = await details.update(propertiesToEdit);

  return res.status(200).json(updateDetails);
};
