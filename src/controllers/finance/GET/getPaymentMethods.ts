import { Request, Response } from "express";
import { models } from "@lib";

const { User, FinancialAccount, PaymentMethod } = models;

export const getPaymentMethodsById = async (req: Request, res: Response) => {
  const user_id = req.user;
  const id = req.params.id;
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

    return res.status(200).json(paymentMethods);
  }

  return res
    .status(400)
    .json({ error: true, message: "Error al obtener los métodos de pagos" });
};

export const getPaymentMethodsByUser = async (req: Request, res: Response) => {
  const user_id = req.user;

  const user = await User.findByPk(user_id);
  if (user) {
    const paymentMethods = await user.getUserPaymentMethods();

    return res.status(200).json(paymentMethods);
  }

  return res
    .status(400)
    .json({ error: true, message: "Error al obtener los métodos de pagos" });
};
