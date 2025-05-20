import { Request, Response } from "express";
import { deleteMovementService } from "../services/delete-movement.services";

export const deleteMovement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req.user;
  const result = await deleteMovementService(id, user_id);
  return res.status(result.status).json(result.body);
};
