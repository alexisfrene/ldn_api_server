import express from "express";
import { deleteExpense } from "@expense-controllers/delete-expense.controller";

const router = express.Router();

router.delete("/:id", deleteExpense);

export default router;
