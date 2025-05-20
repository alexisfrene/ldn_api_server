import express from "express";
import deleteRoutes from "@expense-routes/DELETE.routes";
import getRoutes from "@expense-routes/GET.routes";
import patchRoutes from "@expense-routes/PATCH.routes";
import postRoutes from "@expense-routes/POST.routes";
import { asyncHandler, authenticateToken } from "@middlewares";

const router = express.Router();

router.use(
  "/expenses",
  authenticateToken,
  asyncHandler(async (req, res, next) => getRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => postRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => patchRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => deleteRoutes(req, res, next)),
);

export default router;
