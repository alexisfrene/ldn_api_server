import { Request, Response } from "express";
import { models } from "@lib";

const { User, PaymentMethod, FinancialAccount } = models;

export const getAllMoves = async (req: Request, res: Response) => {
  const user_id = req.user;
  const user = await User.findByPk(user_id);
  const movements = user
    ? await user.getUserMovements({
        order: [
          ["entry_date", "DESC"],
          ["createdAt", "DESC"],
        ],
      })
    : [];
  const mappedMovements = await Promise.all(
    movements.map(async (movement) => {
      const [paymentMethodRecord, financialAccountRecord] = await Promise.all([
        PaymentMethod.findByPk(movement.payment_method_id),
        FinancialAccount.findByPk(movement.financial_accounts_id),
      ]);

      return {
        label: movement.label,
        value: movement.value,
        type: movement.type,
        payment_method: paymentMethodRecord?.name || "Sin método de pago",
        account: financialAccountRecord?.name || "Sin cuenta",
        id: movement.movements_id,
        entry_date: movement.entry_date,
      };
    })
  );

  return res.status(200).json(mappedMovements);
};
