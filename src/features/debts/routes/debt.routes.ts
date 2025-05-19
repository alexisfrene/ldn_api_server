import express from "express";
import deleteRoutes from "@debt-routes/DELETE.routes";
import getRoutes from "@debt-routes/GET.routes";
import patchRoutes from "@debt-routes/PATCH.routes";
import postRoutes from "@debt-routes/POST.routes";
import { asyncHandler, authenticateToken } from "@middlewares";

const router = express.Router();

router.use(
  "/debt",
  authenticateToken,
  asyncHandler(async (req, res, next) => getRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => postRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => patchRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => deleteRoutes(req, res, next)),
);

export default router;
