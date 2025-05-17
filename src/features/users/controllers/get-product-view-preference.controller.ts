import { Request, Response } from "express";
import { models } from "@lib";

const User = models.User;

export const preferenceInProductView = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { preferenceInProductView } = req.query;
  const user = await User.findByPk(user_id);
  if (user)
    await user.update({
      config: {
        ...user.config,
        preference_in_product_view: preferenceInProductView,
      },
    });
  return res.status(200).json({ error: false, message: "Todo ok " });
};
