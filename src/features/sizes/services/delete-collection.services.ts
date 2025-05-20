import { models } from "@lib/sequelize";

const Size = models.Size;
const User = models.User;

export const deleteSizeCollectionService = async (
  user_id: string,
  size_id: string,
) => {
  if (!size_id)
    return {
      status: 400,
      body: { error: true, message: "no se proporciono un size id" },
    };
  if (!user_id)
    return {
      status: 401,
      body: { error: true, message: "El usuario no esta autentificado" },
    };
  const sizeSelected = await Size.findByPk(size_id);
  const userProducts = await User.findByPk(user_id)
    .then((user) => (user ? user.getUserProducts() : []))
    .then((products) =>
      products.filter((product) => product.size_id === Number(size_id)),
    );
  if (userProducts) {
    await Promise.all(
      userProducts.map(async (product: any) => {
        await product.update({ size_value: null, size_id: null });
      }),
    );
  }
  if (sizeSelected) {
    const destroySize = await sizeSelected.destroy();
    return { status: 200, body: { message: destroySize } };
  }
  return {
    status: 400,
    body: { message: "Error al eliminar una colección de tallas", error: true },
  };
};
