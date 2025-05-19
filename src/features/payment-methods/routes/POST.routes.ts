import express from "express";
import { createPaymentMethod } from "@payment-methods-controllers/create-payment-method.controller";
import { createPaymentMethodsValidations } from "@payment-methods-validators/payment-methods.validator";
import { runValidate } from "@middlewares";

const router = express.Router();

router.post(
  "/",
  runValidate(createPaymentMethodsValidations),
  createPaymentMethod,
);

export default router;
