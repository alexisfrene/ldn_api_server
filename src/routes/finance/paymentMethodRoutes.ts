import express from "express";
import { getPaymentMethodsById, createPaymentMethod } from "@controllers";

const router = express.Router();

router.get("/:id", getPaymentMethodsById);
router.post("/", createPaymentMethod);

export default router;
