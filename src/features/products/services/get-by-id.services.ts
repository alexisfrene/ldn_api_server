import { env } from "config/environment";
import { ageTranslations, genderTranslations, styleTranslations } from "mocks";
import { models } from "@lib/sequelize";

const Product = models.Product;
const Brand = models.Brand;

export const getProductByIdService = async (
  productId: string,
  user_id: string,
  req: any,
) => {
  if (!user_id) return { status: 400, body: { error: "Falta user_id" } };
  if (!productId)
    return {
      status: 400,
      body: { error: true, message: "No se paso un id de producto" },
    };
  const product = await Product.findByPk(productId);
  if (!product)
    return {
      status: 400,
      body: { error: true, message: "No se encontró producto" },
    };

  const category = await product.getCategoryProducts();
  const categoryValue = category
    ? category.values.find((e) => e.id === product.category_value)
    : null;
  const size = await product.getSizeProducts();
  const sizeValue = size
    ? size.values.find((e) => e.id === product.size_value)
    : null;

  const detail: any = await product.getDetailProduct({
    include: [{ model: Brand, as: "BrandDetails" }],
  });

  const urlCloudinary = `${
    env === "production" ? "https" : req.protocol
  }://${req.get("host")}/api/products/images/${product.primary_image}`;
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
              `${env === "production" ? "https" : req.protocol}://${req.get(
                "host",
              )}/api/variations/images/${image.replace(/\.[^/.]+$/, "")}`,
          ),
        });
      },
    );
  }

  const { name, product_id, description, price, state, stock, discount } =
    product;

  return {
    status: 200,
    body: {
      category: categoryValue?.value || null,
      detail: {
        gender: detail?.gender
          ? genderTranslations[
              detail.gender as keyof typeof genderTranslations
            ] || detail.gender
          : null,
        color: detail?.color || null,
        style: detail?.style
          ? styleTranslations[detail.style as keyof typeof styleTranslations] ||
            detail.style
          : null,
        age: detail?.age
          ? ageTranslations[detail.age as keyof typeof ageTranslations] ||
            detail.age
          : null,
        brand: detail?.BrandDetails?.title || null,
      },
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
    },
  };
};
