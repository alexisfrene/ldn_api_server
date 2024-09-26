import { Request, Response } from "express";
import { db } from "../../../lib";

const User = db.User;

export const getPaymentMethods = async (req: Request, res: Response) => {
  const user_id = req.user;
  const user = await User.findByPk(user_id);
  const PaymentMethods = await user.getPayment_methods();

  return res.status(200).json(PaymentMethods);
};
