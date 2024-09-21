import express from "express";
import { authenticateToken } from "../../middleware";
import variationsRoutes from "./variationsRoutes";

const router = express.Router();

router.use("/variations", authenticateToken, variationsRoutes);

export { router };
