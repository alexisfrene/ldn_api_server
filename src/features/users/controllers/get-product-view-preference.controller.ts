import { Request, Response } from "express";
import { editPreferenceInProductViewService } from "../services/put-product-view-preference.services";

export const editPreferenceInProductView = async (
  req: Request,
  res: Response,
) => {
  const user_id = req.user;
  const { preferenceInProductView } = req.query;
  const result = await editPreferenceInProductViewService(
    user_id,
    preferenceInProductView as string,
  );
  return res.status(result.status).json(result.body);
};
