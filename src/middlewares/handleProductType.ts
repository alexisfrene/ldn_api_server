import { NextFunction, Request, Response } from "express";

export const handleProductType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { type } = req.query as { type: string };

  if (!type) {
    return res.status(400).json({ error: true, message: "Falta query 'type'" });
  }

  req.productType = type;
  return next();
};
