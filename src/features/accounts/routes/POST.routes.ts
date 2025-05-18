import express from "express";
import { createFinancialAccounts } from "@accounts-controllers/create-accounts.controller";

const router = express.Router();

router.post("/", createFinancialAccounts);

export default router;
