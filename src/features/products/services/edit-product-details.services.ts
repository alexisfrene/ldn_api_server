import { models } from "@lib/sequelize";
import { cleanObject } from "@utils";

const Product = models.Product;
const Detail = models.Detail;

export const editProductDetailsService = async (
  productId: string,
  body: any,
) => {
  const propertiesToEdit = cleanObject(body, [
    "gender",
    "color",
    "brand",
    "style",
    "age",
  ]);

  if (!productId) {
    return { status: 400, body: { error: "Invalid product ID" } };
  }
  const product = await Product.findByPk(productId);
  if (!product) {
    return { status: 404, body: { error: "Product not found" } };
  }
  let selectorDetails = await product?.getDetailProduct();

  const details = await Detail.findByPk(selectorDetails.detail_id);
  if (!details) {
    return { status: 404, body: { error: "Details not found" } };
  }

  const updateDetails = await details.update({
    gender: propertiesToEdit.gender,
    color: propertiesToEdit.color,
    style: propertiesToEdit.style,
    age: propertiesToEdit.age,
    brand_id: propertiesToEdit?.brand,
  });

  return { status: 200, body: updateDetails };
};
