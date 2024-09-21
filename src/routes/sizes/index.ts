import express from "express";
import { asyncHandler, authenticateToken } from "../../middleware";
import sizeRoutes from "./sizesRoutes";

const router = express.Router();

router.use(
  "/size",
  authenticateToken,
  asyncHandler(async (req, res, next) => sizeRoutes(req, res, next))
);

export { router };
