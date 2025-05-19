import { Request, Response } from "express";
import { changeNameService } from "../services/edit-user-name.services";

export const changeName = async (req: Request, res: Response) => {
  const { category_id, category_value } = req.body;
  const result = await changeNameService(category_id, category_value);
  return res.status(result.status).json(result.body);
};
