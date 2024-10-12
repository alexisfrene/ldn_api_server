import { Request, Response, NextFunction } from "express";
import { upload } from "../lib";

export const conditionalUpload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type } = req.query;
  if (type === "image") {
    upload.single("file")(req, res, next);
  } else {
    next();
  }
};
