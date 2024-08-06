import express from "express";
import { authenticateToken } from "../middleware";
import { createFinancialAccounts } from "../controllers";

const router = express.Router();

router.post("/financial_accounts", authenticateToken, createFinancialAccounts);

export { router };
