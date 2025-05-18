import express from "express";
import { userLogin } from "@users-controllers/user-login.controller";
import getRoutes from "@users-routes/GET.routes";
import patchRoutes from "@users-routes/PATCH.routes";
import postRoutes from "@users-routes/POST.routes";
import putRoutes from "@users-routes/PUT.routes";
import { asyncHandler, authenticateToken } from "@middlewares";

const router = express.Router();

router.use(
  "/user",
  authenticateToken,
  asyncHandler(async (req, res, next) => getRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => putRoutes(req, res, next)),
  asyncHandler(async (req, res, next) => patchRoutes(req, res, next)),
);
router.post("/login", userLogin);
router.use(
  "/register",
  asyncHandler(async (req, res, next) => postRoutes(req, res, next)),
);

export default router;
