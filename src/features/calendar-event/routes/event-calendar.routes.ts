import express from "express";
import deleteRoutes from "@event-calendar-routes/DELETE.routes";
import getRoutes from "@event-calendar-routes/GET.routes";
import postRoutes from "@event-calendar-routes/POST.routes";
import putRoutes from "@event-calendar-routes/PUT.routes";
import { asyncHandler, authenticateToken } from "@middlewares";

const router = express.Router();

router.use(
  "/brands",
  authenticateToken,
  asyncHandler(async (req, res, next) => getRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => postRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => deleteRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => putRoutes(req, res, next)),
);

export default router;
