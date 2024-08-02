import express from "express";
import { getAllSell } from "../controllers";
import { authenticateToken } from "../middleware";

const router = express.Router();

router.get("/finances", authenticateToken, getAllSell);

export { router };
