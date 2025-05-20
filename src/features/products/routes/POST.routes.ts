import express from "express";
import { createProducts } from "@products-controllers/create-product.controller";
import { upload } from "@lib/multer";

const router = express.Router();

router.post("/", upload.single("file"), createProducts);

export default router;
