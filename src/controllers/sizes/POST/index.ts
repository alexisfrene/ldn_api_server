import { Request, Response } from "express";
import db from "../../../lib/sequelize";

const Size = db.Size;

export const createSize = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const newSize = await Size.create({
      title: body.title,
      values: body.values,
      user_id: body.user_id,
    });
    return res.status(200).json(newSize);
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};
