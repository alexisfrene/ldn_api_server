import { models } from "@lib/sequelize";

const { Movement } = models;

export const editMovementService = async (
  id: string,
  user_id: string,
  body: any,
) => {
  const { entry_date, label, value, type } = body;
  const movement = await Movement.findByPk(id);

  if (!movement) {
    return { status: 404, body: { message: "Movimiento no encontrado" } };
  }

  if (movement.user_id !== user_id) {
    return {
      status: 403,
      body: { message: "No tienes permiso para editar este movimiento." },
    };
  }

  movement.entry_date = entry_date || movement.entry_date;
  movement.label = label || movement.label;
  movement.value = value || movement.value;
  movement.type = type || movement.type;

  await movement.save();

  return {
    status: 200,
    body: { message: "Movimiento actualizado", movement },
  };
};
