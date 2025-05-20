import express from "express";
import { getAllMoves } from "@movement-controllers/get-all-moves.controller";

const router = express.Router();

router.get("/", getAllMoves);

export default router;
