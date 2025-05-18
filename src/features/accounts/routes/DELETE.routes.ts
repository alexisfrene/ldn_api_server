import express from "express";
import { deleteFinancialAccount } from "@accounts-controllers/delete-account.controller";
import { runValidate } from "@middlewares";
import { deleteFinancialAccountValidations } from "@validators";

const router = express.Router();

router.delete(
  "/:id",
  runValidate(deleteFinancialAccountValidations),
  deleteFinancialAccount,
);

export default router;
