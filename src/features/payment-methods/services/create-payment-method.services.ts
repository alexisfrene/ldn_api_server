import { Uuid } from "types";
import { models } from "@lib/sequelize";

const { PaymentMethod } = models;

export const createPaymentMethodService = async (
  user_id: Uuid,
  name: string,
) => {
  const newPaymentMethod = await PaymentMethod.create({
    name,
    user_id,
  });
  return newPaymentMethod;
};
