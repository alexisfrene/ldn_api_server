import express from "express";
import {
  createFinancialAccounts,
  getFinancialAccounts,
} from "../../controllers";

const router = express.Router();

router.get("/", getFinancialAccounts);
router.post("/", createFinancialAccounts);

export default router;
