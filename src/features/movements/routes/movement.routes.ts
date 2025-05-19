import express from "express";
import { getTotalMonth } from "@movement-controllers/get-total-tonth.controller";
import deleteRoutes from "@movement-routes/DELETE.routes";
import getRoutes from "@movement-routes/GET.routes";
import postRoutes from "@movement-routes/POST.routes";
import patchRoutes from "@movement-routes/PUT.routes";
import { asyncHandler, authenticateToken } from "@middlewares";

const router = express.Router();

router.use(
  "/movement",
  authenticateToken,
  asyncHandler(async (req, res, next) => getRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => postRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => patchRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => deleteRoutes(req, res, next)),
);

router.get(
  "/total_month",
  authenticateToken,
  asyncHandler(async (req, res) => getTotalMonth(req, res)),
);

export default router;
