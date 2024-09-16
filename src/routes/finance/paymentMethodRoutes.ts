import express from "express";
import { getPaymentMethods, createPaymentMethod } from "../../controllers";

const router = express.Router();

router.get("/", getPaymentMethods);
router.post("/", createPaymentMethod);

export default router;
