import express from "express";
import { createEvent } from "@event-calendar-controllers/create-event.controller";
import { getAllEvents } from "@event-calendar-controllers/get-all.controller";

const router = express.Router();
router.get("/", getAllEvents);
router.post("/", createEvent);

export default router;
