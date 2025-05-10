import express from "express";
import { asyncHandler, authenticateToken } from "@middlewares";
import categoriesRoutes from "./categoriesRoutes";

const router = express.Router();

router.use(
  "/categories",
  authenticateToken,
  asyncHandler(async (req, res, next) => categoriesRoutes(req, res, next)),
);

export { router };
