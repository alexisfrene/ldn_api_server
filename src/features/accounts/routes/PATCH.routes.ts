import express from "express";
import { editFinancialAccount } from "@accounts-controllers/edit-account.controller";
import { runValidate } from "@middlewares";
import {
  //createFinancialAccountValidations,

  editFinancialAccountValidations,
} from "@validators";

const router = express.Router();

router.patch(
  "/:id",
  runValidate(editFinancialAccountValidations),
  editFinancialAccount,
);

export default router;
