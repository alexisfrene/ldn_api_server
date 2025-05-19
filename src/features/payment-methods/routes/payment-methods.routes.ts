import express from "express";
import getRoutes from "@payment-methods-routes/GET.routes";
import postRoutes from "@payment-methods-routes/POST.routes";
import { asyncHandler, authenticateToken } from "@middlewares";

const router = express.Router();

router.use(
  "/payment_methods",
  authenticateToken,
  asyncHandler(async (req, res, next) => getRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => postRoutes(req, res, next)),
);

export default router;
