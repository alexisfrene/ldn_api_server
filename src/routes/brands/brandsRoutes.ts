import express from "express";
import { runValidate } from "@middlewares";
import { createBrandValidator } from "@validators";
import { createBrand, getAllBrands } from "@controllers";

const router = express.Router();

router.get("/", getAllBrands);

router.post("/", runValidate(createBrandValidator), createBrand);

export default router;
