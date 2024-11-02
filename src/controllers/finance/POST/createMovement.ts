import { Request, Response } from "express";
import { models } from "@lib";
import { Uuid } from "types";

const { Movement } = models;

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
  const date = entry_date?.split("-");
  const newMovement = await Movement.create({
    label,
    value,
    type,
    payment_method_id: payment_method_id,
    financial_accounts_id,
    user_id: user_id as Uuid,
    entry_date: new Date(date[0], date[1] - 1, date[2], 12),
    expense_id: req.body?.expense_id || null,
  });

  return res.status(200).json({ newMovement });
};
