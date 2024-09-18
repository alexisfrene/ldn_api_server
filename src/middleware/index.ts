import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Uuid } from "../types";
import { upload } from "../lib/multer";
interface CustomError extends Error {
  status?: number;
}
type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Unauthorized: Missing token" });

  const decodedToken = jwt.decode(token) as { user_id: Uuid } | null;

  if (!decodedToken)
    return res.status(401).json({ message: "Unauthorized : Missing token" });

  return jwt.verify(
    token,
    process.env.JWT_SECRET || "",
    { algorithms: ["HS256"] },
    async (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      req.user = decodedToken.user_id;

      return next();
    }
  );
};

export const asyncHandler =
  (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

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

export const handleCategoryRequest = (
  req: Request,
  res: Response,
  next: NextFunction
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

export const handleProductType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type } = req.query as { type: string };

  if (!type) {
    return res.status(400).json({ error: true, message: "Falta query 'type'" });
  }

  req.productType = type;
  return next();
};

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
