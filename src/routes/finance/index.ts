import express from "express";
import { asyncHandler, authenticateToken } from "../../middleware";
import { getTotalMonth } from "../../controllers";
import financialAccountRoutes from "./financialAccountRoutes";
import paymentMethodRoutes from "./paymentMethodRoutes";
import movementRoutes from "./movementRoutes";

const router = express.Router();

router.use(
  "/financial_accounts",
  authenticateToken,
  asyncHandler(async (req, res, next) => financialAccountRoutes(req, res, next))
);
router.use(
  "/payment_methods",
  authenticateToken,
  asyncHandler(async (req, res, next) => paymentMethodRoutes(req, res, next))
);
router.use(
  "/movement",
  authenticateToken,
  asyncHandler(async (req, res, next) => movementRoutes(req, res, next))
);
router.get(
  "/total_month",
  authenticateToken,
  asyncHandler(async (req, res) => getTotalMonth(req, res))
);

export { router };
