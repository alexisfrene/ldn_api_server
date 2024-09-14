import { Request, Response } from "express";
import db from "../../../lib/sequelize";

const User = db.User;

export const getAllMovements = async (req: Request, res: Response) => {
  const user_id = req.user;

  if (!user_id) {
    return res.status(401).json({ message: "No authority", error: true });
  }

  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found", error: true });
    }

    const movements = await user.getMovements({
      order: [["movements_id", "ASC"]],
    });

    return res.status(200).json(movements);
  } catch (error) {
    console.error("Error fetching movements:", error);
    return res
      .status(500)
      .json({ message: "Internal server error movements", error: true });
  }
};

export const getFinancialAccounts = async (req: Request, res: Response) => {
  const user_id = req.user;

  try {
    const user = await User.findByPk(user_id);
    const financialAccounts = await user.getFinancial_accounts();

    return res.status(200).json(financialAccounts);
  } catch (error) {
    console.error("Error fetching sizes:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
};

export const getPaymentMethods = async (req: Request, res: Response) => {
  const user_id = req.user;

  try {
    const user = await User.findByPk(user_id);
    const PaymentMethods = await user.getPayment_methods();

    return res.status(200).json(PaymentMethods);
  } catch (error) {
    console.error("Error fetching PaymentMethods:", error);
    return res
      .status(500)
      .json({ message: "Internal server error PaymentMethods", error: true });
  }
};
