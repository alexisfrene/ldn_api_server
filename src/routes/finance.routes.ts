import express from "express";
import { authenticateToken } from "../middleware";
import { createFinancialAccounts, getFinancialAccounts } from "../controllers";

const router = express.Router();

router.get("/financial_accounts", authenticateToken, getFinancialAccounts);
router.post("/financial_accounts", authenticateToken, createFinancialAccounts);

export { router };
