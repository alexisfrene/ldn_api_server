import { NextFunction, Request, Response } from "express";
import { upload } from "@lib/multer";

export const conditionalUpload = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { type } = req.query;
  if (type === "image") {
    upload.single("file")(req, res, next);
  } else {
    next();
  }
};
