import express from "express";
import { createEvent } from "@event-calendar-controllers/create-event.controller";

const router = express.Router();

router.post("/", createEvent);

export default router;
