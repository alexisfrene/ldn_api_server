import express from "express";
import deleteRoutes from "@categories-routes/DELETE.routes";
import getRoutes from "@categories-routes/GET.routes";
import patchRoutes from "@categories-routes/PATCH.routes";
import postRoutes from "@categories-routes/POST.routes";
import { asyncHandler, authenticateToken } from "@middlewares";

const router = express.Router();

router.use(
  "/categories",
  authenticateToken,
  asyncHandler(async (req, res, next) => postRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => deleteRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => getRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => patchRoutes(req, res, next)),
);

export default router;
