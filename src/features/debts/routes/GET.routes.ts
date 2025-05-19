import express from "express";
import {
  getAllDebts,
  getDebtsById,
} from "@debt-controllers/get-debts.controller";

const router = express.Router();
router.get("/", getAllDebts);
router.get("/:id", getDebtsById);

export default router;
