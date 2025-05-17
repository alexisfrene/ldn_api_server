import express from "express";
import { createBrandController } from "@brands-controllers/create-brand.controller";
import { getAllBrands } from "@brands-controllers/get-brand.controller";
import { runValidate } from "@middlewares";
import { createBrandValidator } from "@validators";

const router = express.Router();

router.get("/", getAllBrands);

router.post("/", runValidate(createBrandValidator), createBrandController);

export default router;
