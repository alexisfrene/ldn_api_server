import { Request, Response } from "express";
import { getAllMovesService } from "../services/get-all-moves.services";

export const getAllMoves = async (req: Request, res: Response) => {
  const user_id = req.user;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await getAllMovesService(user_id, page, limit);
  return res.status(result.status).json(result.body);
};
