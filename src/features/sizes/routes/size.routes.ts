import express from "express";
import deleteRoutes from "@sizes-routes/DELETE.routes";
import getRoutes from "@sizes-routes/GET.routes";
import patchRoutes from "@sizes-routes/PATCH.routes";
import postRoutes from "@sizes-routes/POST.routes";
import { asyncHandler, authenticateToken } from "@middlewares";

const router = express.Router();

router.use(
  "/size",
  authenticateToken,
  asyncHandler(async (req, res, next) => getRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => postRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => patchRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => deleteRoutes(req, res, next)),
);

export default router;
