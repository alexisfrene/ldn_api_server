import { Request, Response } from "express";

export const changeName = async (req: Request, res: Response) => {
  const { category_id, category_value } = req.body;

  return res.status(200).json({ category_id, category_value });
};
