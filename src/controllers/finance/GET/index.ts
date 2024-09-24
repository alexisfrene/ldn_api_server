import { Request, Response } from "express";
import { db } from "../../../lib";

const User = db.User;
const paymentMethod = db.PaymentMethods;
const FinancialAccounts = db.FinancialAccounts;

export const getAllTheMoves = async (req: Request, res: Response) => {
  const user_id = req.user;

  if (!user_id) {
    return res.status(401).json({ message: "No authority", error: true });
  }
  const user = await User.findByPk(user_id);
  if (!user) {
    return res.status(404).json({ message: "User not found", error: true });
  }
  const movements = await user.getMovements({
    order: [["movements_id", "ASC"]],
  });
  const mappedMovements = await Promise.all(
    movements.map(
      async (movement: {
        getFinancial_accounts: () => any;
        label: string;
        value: string;
        type: string;
        payment_method_id: string;
        financial_accounts_id: string;
      }) => {
        const [paymentMethodRecord, financialAccountRecord] = await Promise.all(
          [
            paymentMethod.findByPk(movement.payment_method_id),
            FinancialAccounts.findByPk(movement.financial_accounts_id),
          ]
        );

        return {
          label: movement.label,
          value: movement.value,
          type: movement.type,
          payment_method: paymentMethodRecord?.name,
          account: financialAccountRecord?.name,
        };
      }
    )
  );

  return res.status(200).json(mappedMovements);
};

export const getFinancialAccounts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const user = await User.findByPk(user_id);
  const financialAccounts = await user.getFinancial_accounts();

  return res.status(200).json(financialAccounts);
};

export const getPaymentMethods = async (req: Request, res: Response) => {
  const user_id = req.user;
  const user = await User.findByPk(user_id);
  const PaymentMethods = await user.getPayment_methods();

  return res.status(200).json(PaymentMethods);
};

export const getTotalMonth = async (_req: Request, _res: Response) => {
  //const currentMonth = new Date().toLocaleDateString();
  //  await getAllTheMoves(req, res);
};
