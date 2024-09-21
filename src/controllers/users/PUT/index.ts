import { Request, Response } from "express";
import { db } from "../../../lib";
import { asyncHandler } from "../../../middleware";

const User = db.User;

export const preferenceInProductView = asyncHandler(
  async (req: Request, res: Response) => {
    const user_id = req.user;
    const { preferenceInProductView } = req.query;
    const user = await User.findByPk(user_id);

    await user.update({
      config: {
        ...user.config,
        preference_in_product_view: preferenceInProductView,
      },
    });
    return res.status(200).json({ error: false, message: "Todo ok " });
  }
);
