import express from "express";
import {
  createFinancialAccounts,
  getFinancialAccounts,
  deleteFinancialAccount,
  editFinancialAccount,
} from "../../controllers";
import { runValidate } from "../../middleware";
import {
  createFinancialAccountValidations,
  deleteFinancialAccountValidations,
  editFinancialAccountValidations,
} from "../../validators";

const router = express.Router();

router.get("/", getFinancialAccounts);
router.post(
  "/",
  runValidate(createFinancialAccountValidations),
  createFinancialAccounts
);
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
