import express from "express";
import { createDebts } from "@debt-controllers/create-debts.controller";
import { createDebtValidations } from "@debt-validators/debts.validator";
import { runValidate } from "@middlewares";

const router = express.Router();

router.post("/", runValidate(createDebtValidations), createDebts);

export default router;
