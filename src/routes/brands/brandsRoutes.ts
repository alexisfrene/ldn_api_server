import express from "express";
import { createBrand, getAllBrands } from "@controllers";
import { runValidate } from "@middlewares";
import { createBrandValidator } from "@validators";

const router = express.Router();

router.get("/", getAllBrands);

router.post("/", runValidate(createBrandValidator), createBrand);

export default router;
