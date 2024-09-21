import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../lib";
import { formatDate } from "../../../utils";

const FinancialAccounts = db.FinancialAccounts;
const PaymentMethod = db.PaymentMethods;
const Movement = db.Movements;

export const createMovement = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { label, value, type, payment_method_id, financial_accounts_id } =
    req.body;
  try {
    const newMovement = await Movement.create({
      label,
      value,
      type,
      payment_method_id,
      financial_accounts_id,
      user_id,
    });
    return res.status(200).json({ newMovement });
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};

export const createFinancialAccounts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { name, type } = req.body;

  try {
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
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al crear una cuenta financiera", error: true });
  }
};

export const createPaymentMethod = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { name } = req.body;

  try {
    const newPaymentMethod = await PaymentMethod.create({
      name,
      user_id,
    });
    return res.status(200).json(newPaymentMethod);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al crear una newPaymentMethod", error: true });
  }
};
