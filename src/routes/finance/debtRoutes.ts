import express from "express";
import {
  getPaymentMethodsById,
  getPaymentMethodsByUser,
  createDebts,
} from "@controllers";

const router = express.Router();
router.get("/", getPaymentMethodsByUser);
router.get("/:id", getPaymentMethodsById);
router.post("/", createDebts);

export default router;
