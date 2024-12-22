import { Request, Response } from "express";
import { models } from "@lib";
import { Uuid } from "types";

const { PaymentMethod } = models;

export const createPaymentMethod = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { name } = req.body;

  const newPaymentMethod = await PaymentMethod.create({
    name,
    user_id: user_id as Uuid,
  });
  res.status(200).json(newPaymentMethod);
};
