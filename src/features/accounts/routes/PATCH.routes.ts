import express from "express";
import { editFinancialAccount } from "@accounts-controllers/edit-account.controller";
import { editFinancialAccountValidations } from "@accounts-validators/account.validator";
import { runValidate } from "@middlewares";

const router = express.Router();

router.patch(
  "/:id",
  runValidate(editFinancialAccountValidations),
  editFinancialAccount,
);

export default router;
