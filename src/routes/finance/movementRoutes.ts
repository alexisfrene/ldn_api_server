import express from "express";
import { createMovement, getAllTheMoves } from "../../controllers";

const router = express.Router();

router.get("/", getAllTheMoves);
router.post("/", createMovement);

export default router;
