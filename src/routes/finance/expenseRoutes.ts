import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "@controllers";
import { runValidate } from "@middlewares";
import { createExpenseValidations } from "@validators";

const router = express.Router();

router.post("/", runValidate(createExpenseValidations), createExpense);

router.get("/", getExpenses);

router.get("/:expense_id", getExpenseById);

router.patch("/:expense_id", updateExpense);

router.delete("/:id", deleteExpense);

export default router;
