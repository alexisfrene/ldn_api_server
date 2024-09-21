import express from "express";
import { authenticateToken } from "../../middleware";
import productsRoutes from "./productsRoutes";

const router = express.Router();

router.use("/products", authenticateToken, productsRoutes);

export { router };
