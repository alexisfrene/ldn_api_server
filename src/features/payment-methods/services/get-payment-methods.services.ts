import { models } from "@lib/sequelize";

const { User, FinancialAccount, PaymentMethod } = models;

export const getPaymentMethodsByIdService = async (
  user_id: string,
  id: string,
) => {
  const user = await User.findByPk(user_id);
  if (user) {
    const financialAccountWithPaymentMethods = await FinancialAccount.findOne({
      where: { financial_accounts_id: id },
      include: [
        {
          model: PaymentMethod,
          attributes: ["payment_method_id", "name"],
        },
      ],
      attributes: [],
      raw: false,
    });

    const paymentMethods =
      financialAccountWithPaymentMethods?.PaymentMethods || [];

    return { status: 200, body: paymentMethods };
  }

  return {
    status: 400,
    body: { error: true, message: "Error al obtener los métodos de pagos" },
  };
};

export const getPaymentMethodsByUserService = async (user_id: string) => {
  const user = await User.findByPk(user_id);
  if (user) {
    const paymentMethods = await user.getUserPaymentMethods();
    return { status: 200, body: paymentMethods };
  }

  return {
    status: 400,
    body: { error: true, message: "Error al obtener los métodos de pagos" },
  };
};
