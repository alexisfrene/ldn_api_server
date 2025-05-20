import express from "express";
import { deleteFinancialAccount } from "@accounts-controllers/delete-account.controller";
import { deleteFinancialAccountValidations } from "@accounts-validators/account.validator";
import { runValidate } from "@middlewares";

const router = express.Router();

router.delete(
  "/:id",
  runValidate(deleteFinancialAccountValidations),
  deleteFinancialAccount,
);

export default router;
