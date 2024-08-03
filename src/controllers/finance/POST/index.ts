import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../../../lib/sequelize";

const Size = db.Size;

export const createMovement = async (req: Request, res: Response) => {
  const { title, values, user_id } = req.body;
  try {
    const newSize = await Size.create({
      title,
      values: values.map((e: { value: string }) => {
        return { value: e.value, id: uuidv4() };
      }),
      user_id,
    });
    return res.status(200).json(newSize);
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};
