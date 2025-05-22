import express from "express";
import {
  getAllDebts,
  getDebtsById,
  getStatsDebtsController,
} from "@debt-controllers/get-debts.controller";

const router = express.Router();
router.get("/stats", getStatsDebtsController);
router.get("/:id", getDebtsById);
router.get("/", getAllDebts);

export default router;
