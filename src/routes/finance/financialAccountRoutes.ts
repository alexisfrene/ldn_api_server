import express from "express";
import {
  createFinancialAccounts,
  getFinancialAccounts,
  deleteFinancialAccount,
  editFinancialAccount,
} from "@controllers";
import { runValidate } from "@middlewares";
import {
  //createFinancialAccountValidations,
  deleteFinancialAccountValidations,
  editFinancialAccountValidations,
} from "@validators";

const router = express.Router();

router.get("/", getFinancialAccounts);
router.post("/", createFinancialAccounts);
router.put(
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
