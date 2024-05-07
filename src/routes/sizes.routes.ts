import express from "express";
import { createSize, getAllSizes } from "../controllers";
import { authenticateToken } from "../middleware";

const router = express.Router();

//GET
router.get("/size", authenticateToken, getAllSizes);
//POST
router.post("/size", authenticateToken, createSize);

export { router };
