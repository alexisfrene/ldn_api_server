import { Request, Response } from "express";
import { models } from "@lib";

const User = models.User;

export const getPreferenceInProductView = async (
  req: Request,
  res: Response,
) => {
  const user_id = req.user;
  if (user_id) {
    const user = await User.findByPk(user_id);
    if (user)
      return res.status(200).json({
        preference_in_product_view:
          user.config.preference_in_product_view || false,
      });
  }

  return res.status(401).json({ error: "Falta token" });
};
