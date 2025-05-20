import { Request, Response } from "express";
import { deletePaymentMethodService } from "../services/delete-payment-method.services";

export const deletePaymentMethod = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deletePaymentMethodService(id);
  return res.status(result.status).json(result.body);
};
