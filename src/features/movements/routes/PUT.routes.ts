import express from "express";
import { editMovement } from "@movement-controllers/edit-movement.controller";
import { editMovementValidations } from "@movement-validators/movement.validator";
import { runValidate } from "@middlewares";

const router = express.Router();

router.put("/:id", runValidate(editMovementValidations), editMovement);

export default router;
