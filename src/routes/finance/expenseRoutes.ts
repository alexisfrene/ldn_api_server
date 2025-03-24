import express from "express";
import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "@controllers";
import { createExpenseValidations } from "@validators";
import { runValidate } from "@middlewares";

const router = express.Router();

router.post("/", runValidate(createExpenseValidations), createExpense);

router.get("/", getExpenses);

router.get("/:expense_id", getExpenseById);

router.patch("/:expense_id", updateExpense);

router.delete("/:id", deleteExpense);

export default router;
