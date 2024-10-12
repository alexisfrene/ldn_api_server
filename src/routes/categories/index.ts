import express from "express";
import categoriesRoutes from "./categoriesRoutes";
import { asyncHandler, authenticateToken } from "../../middleware";

const router = express.Router();

router.use(
  "/categories",
  authenticateToken,
  asyncHandler(async (req, res, next) => categoriesRoutes(req, res, next))
);

export { router };
