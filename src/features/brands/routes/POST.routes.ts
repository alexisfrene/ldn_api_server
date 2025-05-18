import express from "express";
import { createBrandController } from "@brands-controllers/create-brand.controller";
import { createBrandValidator } from "@brands-validators/brand.create.validator";
import { runValidate } from "@middlewares";

const router = express.Router();

router.post("/", runValidate(createBrandValidator), createBrandController);

export default router;
