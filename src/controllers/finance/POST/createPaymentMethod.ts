import { Request, Response } from "express";
import { db } from "@lib";

const PaymentMethod = db.PaymentMethod;

export const createPaymentMethod = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { name } = req.body;

  const newPaymentMethod = await PaymentMethod.create({
    name,
    user_id,
  });
  return res.status(200).json(newPaymentMethod);
};
