import express from "express";
import {
  createPaymentMethod,
  getPaymentMethodsById,
  getPaymentMethodsByUser,
} from "@controllers";
import { runValidate } from "@middlewares";
import { createPaymentMethodsValidations } from "@validators";

const router = express.Router();
router.get("/", getPaymentMethodsByUser);
router.get("/:id", getPaymentMethodsById);
router.post(
  "/",
  runValidate(createPaymentMethodsValidations),
  createPaymentMethod,
);

export default router;
