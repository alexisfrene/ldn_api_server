import express from "express";
import { createBrandController } from "@brands-controllers/create-brand.controller";
import { getAllBrands } from "@brands-controllers/get-brand.controller";
import { createBrandValidator } from "@brands-validators/brand.create.validator";
import { asyncHandler, authenticateToken, runValidate } from "@middlewares";

const router = express.Router();

router.get("/", getAllBrands);

router.post("/", runValidate(createBrandValidator), createBrandController);

router.use(
  "/brands",
  authenticateToken,
  asyncHandler(async (req, res, next) => router(req, res, next)),
);

export default router;
