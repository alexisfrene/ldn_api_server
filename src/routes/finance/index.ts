import express from "express";
import { authenticateToken } from "../../middleware";
import { getTotalMonth } from "../../controllers";
import financialAccountRoutes from "./financialAccountRoutes";
import paymentMethodRoutes from "./paymentMethodRoutes";
import movementRoutes from "./movementRoutes";

const router = express.Router();

router.use("/financial_accounts", authenticateToken, financialAccountRoutes);
router.use("/payment_methods", authenticateToken, paymentMethodRoutes);
router.use("/movement", authenticateToken, movementRoutes);
router.get("/total_month", authenticateToken, getTotalMonth);

export { router };
