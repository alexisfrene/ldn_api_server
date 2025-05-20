import { Request, Response } from "express";
import { createUserService } from "../services/create-user.services";

export const createUser = async (req: Request, res: Response) => {
  const result = await createUserService(req.body);
  return res.status(result.status).json(result.body);
};
