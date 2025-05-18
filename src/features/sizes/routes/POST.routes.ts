import express from "express";
import { createSize } from "@sizes-controllers/create-size.controller";
import { runValidate } from "@middlewares";
import { createSizeValidator } from "@validators";

const router = express.Router();

router.post("/", runValidate(createSizeValidator), createSize);

export default router;
