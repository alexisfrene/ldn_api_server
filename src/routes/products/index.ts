import express from "express";
import { asyncHandler, authenticateToken } from "@middlewares";
import productsRoutes from "./productsRoutes";

const router = express.Router();

router.use(
  "/products",
  authenticateToken,
  asyncHandler(async (req, res, next) => productsRoutes(req, res, next)),
);

export { router };
