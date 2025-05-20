import { models } from "@lib/sequelize";

const Size = models.Size;
const User = models.User;

export const deleteSizeValueService = async (
  user_id: string,
  size_id: string,
  size_value: string,
) => {
  if (!size_id)
    return {
      status: 400,
      body: { error: true, message: "no se proporciono un size id" },
    };
  if (!size_value)
    return {
      status: 400,
      body: { error: true, message: "no se proporciono un size value id" },
    };
  if (!user_id)
    return {
      status: 401,
      body: { error: true, message: "El usuario no esta autentificado" },
    };
  const sizeSelected = await Size.findByPk(size_id);
  const newValues = sizeSelected?.values.filter(
    (value) => value.id !== size_value,
  );
  const userProducts = await User.findByPk(user_id)
    .then((user) => (user ? user.getUserProducts() : []))
    .then((products: any[]) =>
      products.filter(
        (product: { size_id: string; size_value: string }) =>
          product.size_id === size_id && product.size_value === size_value,
      ),
    );
  if (userProducts) {
    await Promise.all(
      userProducts.map(async (product: any) => {
        await product.update({ size_value: null });
      }),
    );
  }

  if (sizeSelected) {
    const newValuesInSize = await sizeSelected.update({
      values: newValues,
    });
    return { status: 200, body: { message: newValuesInSize } };
  }
  return {
    status: 400,
    body: { message: "Error al eliminar un valor de tallas", error: true },
  };
};
