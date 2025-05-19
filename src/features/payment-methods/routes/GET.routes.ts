import express from "express";
import {
  getPaymentMethodsById,
  getPaymentMethodsByUser,
} from "@payment-methods-controllers/get-payment-methods.controller";

const router = express.Router();
router.get("/", getPaymentMethodsByUser);
router.get("/:id", getPaymentMethodsById);

export default router;
