import { Request, Response } from "express";
import { db } from "../../../lib";

const Movement = db.Movement;

export const createMovement = async (req: Request, res: Response) => {
  const user_id = req.user;
  const {
    label,
    value,
    type,
    payment_method_id,
    financial_accounts_id,
    entry_date,
  } = req.body;

  const newMovement = await Movement.create({
    label,
    value,
    type,
    payment_method_id,
    financial_accounts_id,
    user_id,
    entry_date,
  });

  return res.status(200).json({ newMovement });
};
