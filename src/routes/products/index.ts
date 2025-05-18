import express from "express";
import { asyncHandler, authenticateToken } from "@middlewares";
import productsRoutes from "../../features/products/routes/products.routes";

const router = express.Router();

router.use(
  "/products",
  authenticateToken,
  asyncHandler(async (req, res, next) => productsRoutes(req, res, next)),
);

export { router };
