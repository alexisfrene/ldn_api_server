import express from "express";
import { asyncHandler, authenticateToken } from "@middlewares";
import variationsRoutes from "../../features/variations/routes/variations.routes";

const router = express.Router();

router.use(
  "/variations",
  authenticateToken,
  asyncHandler(async (req, res, next) => variationsRoutes(req, res, next)),
);

export { router };
