import { Request, Response } from "express";
import {
  getPaymentMethodsByIdService,
  getPaymentMethodsByUserService,
} from "../services/get-payment-methods.services";

export const getPaymentMethodsById = async (req: Request, res: Response) => {
  const user_id = req.user;
  const id = req.params.id;
  const result = await getPaymentMethodsByIdService(user_id, id);
  return res.status(result.status).json(result.body);
};

export const getPaymentMethodsByUser = async (req: Request, res: Response) => {
  const user_id = req.user;
  const result = await getPaymentMethodsByUserService(user_id);
  return res.status(result.status).json(result.body);
};
