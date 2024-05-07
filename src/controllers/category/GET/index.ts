import { Request, Response } from "express";
import db from "../../../lib/sequelize";

const User = db.User;

export const getAllCategories = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  try {
    if (!user_id) return res.status(401).json({ error: "No authority" });
    const user = await User.findByPk(user_id);
    const categories = await user.getCategories();

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};
