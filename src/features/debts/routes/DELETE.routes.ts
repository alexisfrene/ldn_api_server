import express from "express";
import { deleteDebt } from "@debt-controllers/delete-debt.controller";

const router = express.Router();

router.delete("/:id", deleteDebt);

export default router;
