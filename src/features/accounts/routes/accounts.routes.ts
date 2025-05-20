import express from "express";
import deleteRoutes from "@accounts-routes/DELETE.routes";
import getRoutes from "@accounts-routes/GET.routes";
import patchRoutes from "@accounts-routes/PATCH.routes";
import postRoutes from "@accounts-routes/POST.routes";
import { asyncHandler, authenticateToken } from "@middlewares";

const router = express.Router();

router.use(
  "/financial_accounts",
  authenticateToken,
  asyncHandler(async (req, res, next) => getRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => postRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => patchRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => deleteRoutes(req, res, next)),
);

export default router;
