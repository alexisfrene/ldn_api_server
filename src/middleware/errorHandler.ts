import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}
export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.stack);

  const statusCode = err.status || 500;
  res.status(statusCode).json({ message: "Error del servidor" });
};
