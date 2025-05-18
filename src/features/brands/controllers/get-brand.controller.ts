import { Request, Response } from "express";
import { models } from "@lib/sequelize";

const User = models.User;

export const getAllBrands = async (req: Request, res: Response) => {
  const user_id = req.user;

  if (!user_id) {
    return res.status(401).json({ message: "No authority", error: true });
  }
  const user = await User.findByPk(user_id);

  if (!user) {
    return res.status(404).json({ message: "User not found", error: true });
  }
  try {
    const brands = await user.getUserBrands({ order: [["brand_id", "ASC"]] });

    return res.status(200).json(brands);
  } catch (e) {
    return res.status(400).json([]);
  }
};
