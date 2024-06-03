import { Request, Response } from "express";
import db from "../../../lib/sequelize";

const User = db.User;

export const getAllSizes = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  try {
    if (!user_id)
      return res.status(401).json({ message: "No authority", error: true });
    const user = await User.findByPk(user_id);
    const sizes = await user.getSizes();

    return res.status(200).json(sizes);
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};
