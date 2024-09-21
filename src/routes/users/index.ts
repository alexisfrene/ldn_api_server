import express from "express";
import { authenticateToken } from "../../middleware";
import usersRoutes from "./usersRoutes";

const router = express.Router();

router.use("/user", authenticateToken, usersRoutes);

export { router };
