import { models } from "@lib/sequelize";

const Size = models.Size;
const User = models.User;

export const addSizeValueService = async (
  user_id: string,
  size_id: string,
  value: string,
) => {
  if (!user_id)
    return {
      status: 401,
      body: { error: true, message: "Usuario no autorizado" },
    };
  if (!size_id)
    return {
      status: 400,
      body: { error: true, message: "No se proporciono un id de categoría" },
    };

  const user = await User.findByPk(user_id);
  if (user) {
    const userSizes = await user.getUserSizes();
    const validateExistSize = userSizes.find(
      (size) => size.size_id === Number(size_id),
    );
    if (!validateExistSize)
      return {
        status: 400,
        body: { error: true, message: "La categoría no existe en el usuario" },
      };
    const selectedSize = await Size.findByPk(size_id);
    if (selectedSize) {
      const validateRepeatValue = selectedSize.values.find(
        (e) => e.value === value,
      );
      if (validateRepeatValue)
        return {
          status: 400,
          body: {
            error: true,
            message: `Èl valor ( ${value} , ya esta cargado )`,
          },
        };
      const newValue = {
        id: "add-" + selectedSize.values.length++,
        value,
      };

      const formatValues = selectedSize.values.filter(
        (item) => item !== undefined,
      );
      const updateSize = await selectedSize.update({
        values: [...formatValues, newValue],
      });

      return { status: 200, body: updateSize };
    }
  }

  return {
    status: 400,
    body: { error: true, message: "Error al agregar un valor a tallas" },
  };
};
