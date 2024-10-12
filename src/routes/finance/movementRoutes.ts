import express from "express";
import {
  createMovement,
  deleteMovement,
  editMovement,
  getAllTheMoves,
} from "../../controllers";
import { runValidate } from "../../middleware";
import {
  createMovementValidations,
  deleteMovementValidations,
  editMovementValidations,
} from "../../validators";

const router = express.Router();

router.get("/", getAllTheMoves);
router.post("/", runValidate(createMovementValidations), createMovement);
router.put("/:id", runValidate(editMovementValidations), editMovement);
router.delete("/:id", runValidate(deleteMovementValidations), deleteMovement);
export default router;
