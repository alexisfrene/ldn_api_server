import { Request, Response } from "express";
import { preferenceInProductViewService } from "../services/get-product-view-preference.services";

export const preferenceInProductView = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { preferenceInProductView } = req.query;
  const result = await preferenceInProductViewService(
    user_id,
    preferenceInProductView as string,
  );
  return res.status(result.status).json(result.body);
};
