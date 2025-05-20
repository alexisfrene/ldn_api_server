import express from "express";
import {
  getExpenseById,
  getExpenses,
} from "@expense-controllers/get-expenses.controller";

const router = express.Router();

router.get("/", getExpenses);

router.get("/:expense_id", getExpenseById);

export default router;
