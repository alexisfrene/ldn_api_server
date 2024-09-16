import { Request, Response } from "express";
import db from "../../../lib/sequelize";
import { asyncHandler } from "../../../middleware";

const User = db.User;

export const getAllTheMoves = asyncHandler(
  async (req: Request, res: Response) => {
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

    return res.status(200).json(movements);
  }
);

export const getFinancialAccounts = asyncHandler(
  async (req: Request, res: Response) => {
    const user_id = req.user;
    const user = await User.findByPk(user_id);
    const financialAccounts = await user.getFinancial_accounts();

    return res.status(200).json(financialAccounts);
  }
);

export const getPaymentMethods = asyncHandler(
  async (req: Request, res: Response) => {
    const user_id = req.user;
    const user = await User.findByPk(user_id);
    const PaymentMethods = await user.getPayment_methods();

    return res.status(200).json(PaymentMethods);
  }
);

export const getTotalMonth = async (_req: Request, _res: Response) => {
  //const currentMonth = new Date().toLocaleDateString();
  //  await getAllTheMoves(req, res);
};
