import { Request, Response, NextFunction } from "express";

export const validateCategoryQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ error: true, message: "Falta query 'type'" });
  }

  return next();
};
