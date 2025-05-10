import express from "express";
import { getTotalMonth } from "@controllers";
import { asyncHandler, authenticateToken } from "@middlewares";
import debtRoutes from "./debtRoutes";
import expenseRoutes from "./expenseRoutes";
import financialAccountRoutes from "./financialAccountRoutes";
import movementRoutes from "./movementRoutes";
import paymentMethodRoutes from "./paymentMethodRoutes";

const router = express.Router();

router.use(
  "/financial_accounts",
  authenticateToken,
  asyncHandler(async (req, res, next) =>
    financialAccountRoutes(req, res, next),
  ),
);
router.use(
  "/payment_methods",
  authenticateToken,
  asyncHandler(async (req, res, next) => paymentMethodRoutes(req, res, next)),
);
router.use(
  "/movement",
  authenticateToken,
  asyncHandler(async (req, res, next) => movementRoutes(req, res, next)),
);
router.get(
  "/total_month",
  authenticateToken,
  asyncHandler(async (req, res) => getTotalMonth(req, res)),
);
router.use(
  "/expenses",
  authenticateToken,
  asyncHandler(async (req, res, next) => expenseRoutes(req, res, next)),
);
router.use(
  "/debt",
  authenticateToken,
  asyncHandler(async (req, res, next) => debtRoutes(req, res, next)),
);

export { router };
