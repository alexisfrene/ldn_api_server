import express from "express";
import { asyncHandler, authenticateToken } from "@middlewares";
import loginRoutes from "./loginRoutes";
import registerRoutes from "./registerRouter";
import usersRoutes from "./usersRoutes";

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
