import express from "express";
import { createDebts, getAllDebts, getDebtsById } from "@controllers";
import { runValidate } from "@middlewares";
import { createDebtValidations } from "@validators";

const router = express.Router();
router.get("/", getAllDebts);
router.get("/:id", getDebtsById);
router.post("/", runValidate(createDebtValidations), createDebts);

export default router;
