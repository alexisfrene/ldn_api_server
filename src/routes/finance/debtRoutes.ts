import express from "express";
import {
  createDebts,
  deleteDebt,
  editDebt,
  getAllDebts,
  getDebtsById,
} from "@controllers";
import { runValidate } from "@middlewares";
import { createDebtValidations } from "validators/financeValidator";


const router = express.Router();
router.get("/", getAllDebts);
router.get("/:id", getDebtsById);
router.patch("/:id", editDebt);
router.delete("/:id", deleteDebt);
router.post("/", runValidate(createDebtValidations), createDebts);

export default router;
