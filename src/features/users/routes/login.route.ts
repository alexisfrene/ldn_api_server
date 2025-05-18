import express from "express";
import { userLogin } from "@users-controllers/user-login.controller";

const router = express.Router();

router.post("/", userLogin);

export default router;
