import express from "express";
import { authenticateToken } from "../middleware";
import {
  createFinancialAccounts,
  createMovement,
  createPaymentMethod,
  getAllMovements,
  getFinancialAccounts,
  getPaymentMethods,
} from "../controllers";

const router = express.Router();

router.get("/financial_accounts", authenticateToken, getFinancialAccounts);
router.post("/financial_accounts", authenticateToken, createFinancialAccounts);
router.get("/payment_methods", authenticateToken, getPaymentMethods);
router.post("/payment_methods", authenticateToken, createPaymentMethod);
router.post("/movement", authenticateToken, createMovement);
router.get("/movement", authenticateToken, getAllMovements);

export { router };
