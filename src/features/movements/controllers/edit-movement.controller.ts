import { Request, Response } from "express";
import { editMovementService } from "../services/edit-movement.services";

export const editMovement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req.user;
  const result = await editMovementService(id, user_id, req.body);
  return res.status(result.status).json(result.body);
};
