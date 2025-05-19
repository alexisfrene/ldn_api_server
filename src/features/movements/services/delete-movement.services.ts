import { models } from "@lib/sequelize";

const { Movement, Installment } = models;

export const deleteMovementService = async (id: string, user_id: string) => {
  const movement = await Movement.findByPk(id);

  if (!movement) {
    return { status: 404, body: { message: "Movimiento no encontrado" } };
  }

  if (
    movement.type === "money_outflow" &&
    movement.debt_id &&
    movement.installment_id
  ) {
    await Installment.findByPk(movement.installment_id).then((res) =>
      res?.update({ status: "unpaid" }),
    );
  }

  if (movement.user_id !== user_id) {
    return {
      status: 403,
      body: { message: "No tienes permiso para eliminar este movimiento." },
    };
  }

  await movement.destroy();

  return { status: 200, body: { message: "Movimiento eliminado" } };
};
