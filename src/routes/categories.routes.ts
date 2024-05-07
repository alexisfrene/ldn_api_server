import express from "express";
import { createCategories, getAllCategories } from "../controllers";
import { authenticateToken } from "../middleware";

const router = express.Router();

//GET
router.get("/categories", authenticateToken, getAllCategories);
//POST
router.post("/categories", authenticateToken, createCategories);

export { router };
