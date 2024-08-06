import { Request, Response } from "express";
//import { v4 as uuidv4 } from "uuid";
import db from "../../../lib/sequelize";

const FinancialAccounts = db.FinancialAccounts;

export const createMovement = async (req: Request, res: Response) => {
  const { title, values, user_id } = req.body;
  try {
    return res.status(200).json({ title, values, user_id });
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};

export const createFinancialAccounts = async (req: Request, res: Response) => {
  const { name, type, values, user_id } = req.body;
  console.log("fdasdf");
  try {
    const newFinancialAccounts = await FinancialAccounts.create({
      name,
      type,
      values,
      user_id,
    });
    return res.status(200).json(newFinancialAccounts);
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};
