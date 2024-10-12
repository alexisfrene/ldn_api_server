import express from "express";
import { createUser } from "../../controllers";

const router = express.Router();

router.post("/", createUser);

export default router;
