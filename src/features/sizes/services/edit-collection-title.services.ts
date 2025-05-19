import { models } from "@lib/sequelize";

const Size = models.Size;

export const modifyTitleCollectionSizeService = async (
  user_id: string,
  size_id: string,
  title: string,
) => {
  if (!user_id)
    return {
      status: 401,
      body: { error: true, message: "Usuario no autorizado" },
    };
  if (!size_id)
    return {
      status: 400,
      body: {
        error: true,
        message: "No se proporciono un id del numero/talla",
      },
    };
  const sizeSelected = await Size.findByPk(size_id);
  if (!sizeSelected)
    return {
      status: 400,
      body: { error: true, message: "No se encontró la numero/talla" },
    };
  const updateSize = await sizeSelected.update({ title });
  return { status: 200, body: updateSize };
};
