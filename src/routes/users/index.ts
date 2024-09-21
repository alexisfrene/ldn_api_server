import express from "express";
import { asyncHandler, authenticateToken } from "../../middleware";
import usersRoutes from "./usersRoutes";
import loginRoutes from "./loginRoutes";

const router = express.Router();

router.use(
  "/user",
  authenticateToken,
  asyncHandler(async (req, res, next) => usersRoutes(req, res, next))
);
router.use(
  "/login",
  asyncHandler(async (req, res, next) => loginRoutes(req, res, next))
);

export { router };
