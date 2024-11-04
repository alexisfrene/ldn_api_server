import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { models } from "@lib";

const Size = models.Size;

export const createSize = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { title, values } = req.body;
  const newSize = await Size.create({
    title,
    values: values.map((e: { value: string }) => {
      return { value: e.value, id: uuidv4() };
    }),
    user_id,
  });
  return res.status(200).json(newSize);
};
