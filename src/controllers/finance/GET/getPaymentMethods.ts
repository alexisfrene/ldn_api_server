import { Request, Response } from "express";
import { models } from "@lib";

const User = models.User;

export const getPaymentMethods = async (req: Request, res: Response) => {
  const user_id = req.user;
  const user = await User.findByPk(user_id);
  if (user) {
    const PaymentMethods = await user.getUserPaymentMethods();

    return res.status(200).json(PaymentMethods);
  }

  return res
    .status(400)
    .json({ error: true, message: "Error al obtener los métodos de pagos" });
};
