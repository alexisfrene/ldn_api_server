import { Request, Response } from "express";
import { createMovementService } from "../services/create-movement.services";

export const createMovement = async (req: Request, res: Response) => {
  const user_id = req.user;
  const result = await createMovementService(user_id, req.body);
  return res.status(result.status).json(result.body);
};
