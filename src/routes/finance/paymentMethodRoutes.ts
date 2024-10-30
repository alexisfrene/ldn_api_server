import express from "express";
import {
  getPaymentMethodsById,
  createPaymentMethod,
  getPaymentMethodsByUser,
} from "@controllers";

const router = express.Router();
router.get("/", getPaymentMethodsByUser);
router.get("/:id", getPaymentMethodsById);
router.post("/", createPaymentMethod);

export default router;
