import express from "express";
import { deleteMovement } from "@movement-controllers/delete-movement.controller";
import { deleteMovementValidations } from "@movement-validators/movement.validator";
import { runValidate } from "@middlewares";

const router = express.Router();

router.delete("/:id", runValidate(deleteMovementValidations), deleteMovement);

export default router;
