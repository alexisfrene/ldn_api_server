import { Request, Response } from "express";
import db from "../../../lib/sequelize";

//const Size = db.Size;
const User = db.User;

export const getAllSizes = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const user = await User.findByPk(body.user_id);
    const sizes = await user.getSizes();

    return res.status(200).json(sizes);
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};
