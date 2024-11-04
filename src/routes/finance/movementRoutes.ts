import express from "express";
import {
  createMovement,
  deleteMovement,
  editMovement,
  getAllMoves,
} from "@controllers";
import { runValidate } from "@middlewares";
import {
  createMovementValidations,
  deleteMovementValidations,
  editMovementValidations,
} from "@validators";

const router = express.Router();

router.get("/", getAllMoves);
router.post("/", runValidate(createMovementValidations), createMovement);
router.put("/:id", runValidate(editMovementValidations), editMovement);
router.delete("/:id", runValidate(deleteMovementValidations), deleteMovement);

export default router;
