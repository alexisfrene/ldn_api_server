import { user_id } from "@utils";
import { Models } from "@models";

const seedPaymentMethods = async (models: Models) => {
  try {
    await models.PaymentMethod.bulkCreate(
      [
        {
          user_id,
          payment_method_id: 101,
          name: "Efectivo",
        },
        {
          user_id,
          payment_method_id: 102,
          name: "Trasferencia",
        },
        {
          user_id,
          payment_method_id: 103,
          name: "Point",
        },
      ],
      { ignoreDuplicates: true },
    );

    console.log("Seeding PaymentMethods completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
export default seedPaymentMethods;
