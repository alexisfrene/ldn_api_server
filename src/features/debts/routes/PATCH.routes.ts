import express from "express";
import { editDebt } from "@debt-controllers/edit.debt.controller";

const router = express.Router();

router.patch("/:id", editDebt);

export default router;
