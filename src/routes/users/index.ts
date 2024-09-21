import express from "express";
import { authenticateToken } from "../../middleware";
import usersRoutes from "./usersRoutes";
import loginRoutes from "./loginRoutes";

const router = express.Router();

router.use("/user", authenticateToken, usersRoutes);
router.use("/login", loginRoutes);

export { router };
