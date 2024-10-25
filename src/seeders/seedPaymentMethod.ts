import { Uuid } from "types";
import { Models } from "@models";

export const seedPaymentMethods = async (models: Models) => {
  try {
    await models.PaymentMethod.bulkCreate([
      {
        user_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
        payment_method_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
        name: "Efectivo",
      },
      {
        user_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
        payment_method_id: "123e4567-e89b-12d3-a456-426614174001" as Uuid,
        name: "Trasferencia",
      },
    ]);

    console.log("Seeding PaymentMethods completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
