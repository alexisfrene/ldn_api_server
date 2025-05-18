import express from "express";
import { asyncHandler, authenticateToken } from "@middlewares";
import brandsRoutes from "../../features/brands/routes/brand.routes";

const router = express.Router();

router.use(
  "/brands",
  authenticateToken,
  asyncHandler(async (req, res, next) => brandsRoutes(req, res, next)),
);

export { router };
