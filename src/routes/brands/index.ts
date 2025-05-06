import express from "express";
import brandsRoutes from "./brandsRoutes";
import { asyncHandler, authenticateToken } from "@middlewares";

const router = express.Router();

router.use(
  "/brands",
  authenticateToken,
  asyncHandler(async (req, res, next) => brandsRoutes(req, res, next))
);

export { router };
