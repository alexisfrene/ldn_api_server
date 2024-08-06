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
  const { name, type, user_id } = req.body;

  try {
    if (type === "inflow_of_money" || type === "money_outflow") {
      const newFinancialAccounts = await FinancialAccounts.create({
        name,
        type,
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
