import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../lib";

const FinancialAccounts = db.FinancialAccounts;

export const addFinancialAccount = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { financial_accounts_id, value } = req.body;
  try {
    if (!financial_accounts_id)
      res.status(400).json({
        message: "Error al agregar una cuenta financiera",
        error: true,
      });
    const financialAccount = await FinancialAccounts.findByPk(
      financial_accounts_id
    );
    await financialAccount.update({
      values: [
        {
          name: value.name,
          value: value.value,
          updatedAt: new Date(),
          createdAt: new Date(),
          expiration: value?.expiration || 0,
          id: uuidv4(),
        },
      ],
    });
    return res.status(200).json({ financial_accounts_id, value, user_id });
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};
