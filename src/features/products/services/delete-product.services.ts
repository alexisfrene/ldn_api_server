import { models } from "@lib/sequelize";

const Product = models.Product;

export const deleteProductService = async (productId: string) => {
  const product = await Product.findByPk(productId);
  if (product) {
    await product.update({ state: false });
    if (!product.state) {
      return { status: 200, body: "Eliminación exitosa!" };
    }
  }
  return { status: 500, body: "No se pudo eliminar" };
};
