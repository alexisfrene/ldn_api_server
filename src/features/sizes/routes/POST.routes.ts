import express from "express";
import { createSize } from "@sizes-controllers/create-size.controller";
import { createSizeValidator } from "@sizes-validators/size.validator";
import { runValidate } from "@middlewares";

const router = express.Router();

router.post("/", runValidate(createSizeValidator), createSize);

export default router;
