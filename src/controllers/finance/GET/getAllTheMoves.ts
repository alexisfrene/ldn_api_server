import { Request, Response } from "express";
import { models } from "@lib";

const User = models.User;
const paymentMethod = models.PaymentMethod;
const FinancialAccounts = models.FinancialAccount;

export const getAllTheMoves = async (req: Request, res: Response) => {
  const user_id = req.user;

  if (!user_id) {
    return res.status(401).json({ message: "No authority", error: true });
  }
  const user = await User.findByPk(user_id);
  if (!user) {
    return res.status(404).json({ message: "User not found", error: true });
  }
  const movements = await user.getUserMovements({
    order: [["movements_id", "ASC"]],
  });
  const mappedMovements = await Promise.all(
    movements.map(async (movement) => {
      const [paymentMethodRecord, financialAccountRecord] = await Promise.all([
        paymentMethod.findByPk(movement.payment_method_id),
        FinancialAccounts.findByPk(movement.financial_accounts_id),
      ]);

      return {
        label: movement.label,
        value: movement.value,
        type: movement.type,
        payment_method: paymentMethodRecord?.name || "Sin método de pago",
        account: financialAccountRecord?.name || "Sin cuenta",
        id: movement.movements_id,
      };
    })
  );

  return res.status(200).json(mappedMovements);
};
