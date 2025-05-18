import express from "express";
import deleteRoutes from "@variations-routes/DELETE.routes";
import getRoutes from "@variations-routes/GET.routes";
import patchRoutes from "@variations-routes/PATCH.routes";
import postRoutes from "@variations-routes/POST.routes";
import { asyncHandler, authenticateToken } from "@middlewares";

const router = express.Router();

router.use(
  "/variations",
  authenticateToken,
  asyncHandler(async (req, res, next) => getRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => postRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => patchRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => deleteRoutes(req, res, next)),
);

export default router;
