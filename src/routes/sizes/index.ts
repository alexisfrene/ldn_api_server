import express from "express";
import { authenticateToken } from "../../middleware";
import sizeRoutes from "./sizesRoutes";

const router = express.Router();

router.use("/size", authenticateToken, sizeRoutes);

export { router };
