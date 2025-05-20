import express from "express";
import deleteRoutes from "@products-routes/DELETE.routes";
import getRoutes from "@products-routes/GET.routes";
import patchRoutes from "@products-routes/PATCH.routes";
import postRoutes from "@products-routes/POST.routes";
import { asyncHandler, authenticateToken } from "@middlewares";

const router = express.Router();

router.use(
  "/products",
  authenticateToken,
  asyncHandler(async (req, res, next) => getRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => postRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => deleteRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => patchRoutes(req, res, next)),
);

export default router;
