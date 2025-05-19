import { deleteFromMinio, uploadToMinio } from "@lib/minio";
import { models } from "@lib/sequelize";

const Product = models.Product;

export const changeImageProductService = async (
  userId: string,
  file: Express.Multer.File,
  productId: string,
) => {
  if (!userId)
    return {
      status: 401,
      body: { error: true, message: "User no autorizado" },
    };
  if (!file)
    return { status: 400, body: { error: true, message: "fatal image" } };

  const image_url = await uploadToMinio(file, `${userId}/products`, userId);

  if (!image_url)
    return {
      status: 400,
      body: { error: true, message: "Error al subir la imagen" },
    };

  const product = await Product.findByPk(productId);
  if (product) {
    await deleteFromMinio(product.primary_image, `${userId}/products`);
    await product.update({ primary_image: image_url });
    return { status: 200, body: { error: false } };
  }
  return {
    status: 400,
    body: { error: true, message: "Error al subir la imagen" },
  };
};
