import { Request, Response } from "express";
import { Uuid } from "types";
import { createPaymentMethodService } from "../services/create-payment-method.services";

export const createPaymentMethod = async (req: Request, res: Response) => {
  const user_id = req.user as Uuid;
  const { name } = req.body;

  const newPaymentMethod = await createPaymentMethodService(user_id, name);
  return res.status(200).json(newPaymentMethod);
};
