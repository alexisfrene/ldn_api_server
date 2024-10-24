import { Request, Response } from "express";
import { models } from "@lib";
import { Uuid } from "types";

const Movement = models.Movement;

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
    payment_method_id: payment_method_id as Uuid,
    financial_accounts_id,
    user_id: user_id as Uuid,
    entry_date,
  });

  return res.status(200).json({ newMovement });
};
