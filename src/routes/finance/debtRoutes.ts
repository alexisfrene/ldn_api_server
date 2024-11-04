import express from "express";
import { createDebts, getAllDebts, getDebtsById } from "@controllers";

const router = express.Router();
router.get("/", getAllDebts);
router.get("/:id", getDebtsById);
router.post("/", createDebts);

export default router;
