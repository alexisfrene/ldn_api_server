import express from "express";
import { createFinancialAccounts } from "@accounts-controllers/create-accounts.controller";
import { createFinancialAccountValidations } from "@accounts-validators/account.validator";
import { runValidate } from "@middlewares";

const router = express.Router();

router.post(
  "/",
  runValidate(createFinancialAccountValidations),
  createFinancialAccounts,
);

export default router;
