import express from "express";
import { authenticateToken } from "../../middleware";
import sizeRoutes from "./sizesRoutes";

const router = express.Router();

router.use("/sizes", authenticateToken, sizeRoutes);

export { router };
