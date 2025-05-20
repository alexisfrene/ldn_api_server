import { models } from "@lib/sequelize";

const { PaymentMethod } = models;

export const deletePaymentMethodService = async (payment_method_id: string) => {
  const paymentMethod = await PaymentMethod.findByPk(payment_method_id);
  if (!paymentMethod) {
    return { status: 404, body: { error: "Método de pago no encontrado" } };
  }
  await paymentMethod.destroy();
  return { status: 200, body: { message: "Método de pago eliminado" } };
};
