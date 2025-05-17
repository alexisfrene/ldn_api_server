import express from "express";
import { asyncHandler, authenticateToken } from "@middlewares";
import loginRoutes from "../../features/users/routes/login.route";
import registerRoutes from "../../features/users/routes/register.route";
import usersRoutes from "../../features/users/routes/users.routes";

const router = express.Router();

router.use(
  "/user",
  authenticateToken,
  asyncHandler(async (req, res, next) => usersRoutes(req, res, next)),
);
router.use(
  "/login",
  asyncHandler(async (req, res, next) => loginRoutes(req, res, next)),
);
router.use(
  "/register",
  asyncHandler(async (req, res, next) => registerRoutes(req, res, next)),
);

export { router };
