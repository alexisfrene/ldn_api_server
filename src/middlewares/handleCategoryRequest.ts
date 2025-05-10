import { NextFunction, Request, Response } from "express";

export const handleCategoryRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { type } = req.query;

  switch (type) {
    case "collection":
      return next();
    case "value":
      return next();
    case "icon":
      return next();
    default:
      return res
        .status(400)
        .json({ error: true, message: "Tipo de consulta inválida" });
  }
};
