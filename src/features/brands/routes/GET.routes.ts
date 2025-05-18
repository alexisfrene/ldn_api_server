import express from "express";
import { getAllBrands } from "@brands-controllers/get-brand.controller";

const router = express.Router();

router.get("/", getAllBrands);

export default router;
