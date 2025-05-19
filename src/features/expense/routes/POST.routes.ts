import express from "express";
import { createExpense } from "@expense-controllers/create-expense.controller";
import { createExpenseValidations } from "@expense-validators/expense.validator";
import { runValidate } from "@middlewares";

const router = express.Router();

router.post("/", runValidate(createExpenseValidations), createExpense);

export default router;
