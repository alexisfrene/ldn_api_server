import express from "express";
import { createUser } from "@users-controllers/create-user.controller";

const router = express.Router();

router.post("/", createUser);

export default router;
