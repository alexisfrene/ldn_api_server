import express from "express";
import {
  getFinancialAccounts,
  getIsValidAccountName,
} from "@accounts-controllers/get-accounts.controller";

const router = express.Router();

router.get("/", getFinancialAccounts);
router.get("/check-name", getIsValidAccountName);

export default router;
