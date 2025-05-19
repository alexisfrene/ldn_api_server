import express from "express";
import { updateExpense } from "@expense-controllers/update-expense.controller";

const router = express.Router();

router.patch("/:expense_id", updateExpense);

export default router;
