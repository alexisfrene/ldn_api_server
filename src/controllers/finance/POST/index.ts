import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../lib";
import { formatDate } from "../../../utils";
import { asyncHandler } from "../../../middleware";

const FinancialAccounts = db.FinancialAccounts;
const PaymentMethod = db.PaymentMethods;
const Movement = db.Movements;

export const createMovement = asyncHandler(
  async (req: Request, res: Response) => {
    const user_id = req.user;
    const { label, value, type, payment_method_id, financial_accounts_id } =
      req.body;

    const newMovement = await Movement.create({
      label,
      value,
      type,
      payment_method_id,
      financial_accounts_id,
      user_id,
    });
    return res.status(200).json({ newMovement });
  }
);

export const createFinancialAccounts = asyncHandler(
  async (req: Request, res: Response) => {
    const user_id = req.user;
    const { name, type } = req.body;

    if (type === "inflow_of_money" || type === "money_outflow") {
      const newFinancialAccounts = await FinancialAccounts.create({
        name,
        type,
        values: [
          {
            name: "-",
            updatedAt: formatDate(),
            createdAt: formatDate(),
            id: uuidv4(),
            value: 0,
          },
        ],
        user_id,
      });
      return res.status(200).json(newFinancialAccounts);
    } else {
      return res
        .status(400)
        .json({ message: "Error al crear una cuenta financiera", error: true });
    }
  }
);

export const createPaymentMethod = asyncHandler(
  async (req: Request, res: Response) => {
    const user_id = req.user;
    const { name } = req.body;

    const newPaymentMethod = await PaymentMethod.create({
      name,
      user_id,
    });
    return res.status(200).json(newPaymentMethod);
  }
);
