import { Request, Response } from "express";
import { getSecureUrl, models } from "@lib";

const Product = models.Product;

export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const user_id = req.user;

  if (!user_id) return res.status(400).json({ error: "Falta user_id" });
  if (!productId)
    return res
      .status(400)
      .json({ error: true, message: "No se paso un id de producto" });
  const product = await Product.findByPk(productId);
  if (!product)
    return res
      .status(400)
      .json({ error: true, message: "No se encontró producto" });

  const category = await product.getCategoryProducts();
  const categoryValue = category
    ? category.values.find((e) => e.id === product.category_value)
    : null;
  const size = await product.getSizeProducts();
  const sizeValue = size
    ? size.values.find((e) => e.id === product.size_value)
    : null;

  const detail = await product.getDetailProduct();
  const urlCloudinary = getSecureUrl(product.primary_image, user_id);
  let variationFormat = {
    variation_id: "",
    title: "",
    values: [] as { id: string; label: string; images: string[] }[],
  };
  const variations = await product.getVariationProducts();

  if (variations) {
    variationFormat.title = variations.title;
    variationFormat.variation_id = variations.variation_id;
    variations.values.forEach(
      (value: { id: string; label: string; images: string[] }) => {
        variationFormat.values.push({
          id: value.id,
          label: value.label,
          images: value.images.map(
            (image: string) =>
              getSecureUrl(`variations/${image}`, user_id) || ""
          ),
        });
      }
    );
  }

  const { name, product_id, description, price, state, stock, discount } =
    product;

  return res.status(200).json({
    category: categoryValue?.value || null,
    detail,
    size: sizeValue?.value || null,
    name,
    product_id,
    description,
    primary_image: urlCloudinary || "",
    price,
    state,
    stock,
    discount,
    variation: variationFormat,
  });
};
