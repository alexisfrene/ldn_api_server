import { Request, Response, NextFunction } from "express";

export const validateSizeQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type } = req.query as { type: string };
  if (!type)
    return res.status(400).json({ error: true, message: "Falta query 'type'" });

  req.sizeType = type;

  return next();
};
