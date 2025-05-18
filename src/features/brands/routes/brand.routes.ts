import express from "express";
import getRoutes from "@brands-routes/GET.routes";
import postRoutes from "@brands-routes/POST.routes";
import { asyncHandler, authenticateToken } from "@middlewares";

const router = express.Router();

router.use(
  "/brands",
  authenticateToken,
  asyncHandler(async (req, res, next) => getRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => postRoutes(req, res, next)),
);

export default router;
