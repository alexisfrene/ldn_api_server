import express from "express";
import categoriesRoutes from "./categoriesRoutes";
import { authenticateToken } from "../../middleware";

const router = express.Router();

router.use("/categories", authenticateToken, categoriesRoutes);

export { router };
