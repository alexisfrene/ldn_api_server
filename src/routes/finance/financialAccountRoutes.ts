import express from "express";
import {
  createFinancialAccounts,
  getFinancialAccounts,
  deleteFinancialAccount,
  editFinancialAccount,
  getIsValidAccountName,
} from "@controllers";
import { runValidate } from "@middlewares";
import {
  //createFinancialAccountValidations,
  deleteFinancialAccountValidations,
  editFinancialAccountValidations,
} from "@validators";

const router = express.Router();

router.get("/", getFinancialAccounts);
router.get("/check-name", getIsValidAccountName);
router.post("/", createFinancialAccounts);
router.patch(
  "/:id",
  runValidate(editFinancialAccountValidations),
  editFinancialAccount
);
router.delete(
  "/:id",
  runValidate(deleteFinancialAccountValidations),
  deleteFinancialAccount
);

export default router;
