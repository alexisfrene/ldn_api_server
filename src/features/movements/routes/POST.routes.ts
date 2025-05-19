import express from "express";
import { createMovement } from "@movement-controllers/create-movement.controller";
import { createMovementValidations } from "@movement-validators/movement.validator";
import { runValidate } from "@middlewares";

const router = express.Router();

router.post("/", runValidate(createMovementValidations), createMovement);

export default router;
