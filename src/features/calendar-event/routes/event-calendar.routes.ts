import express from "express";
import { createEvent } from "@event-calendar-controllers/create-event.controller";
import { deleteEvent } from "@event-calendar-controllers/delete-event.controller";
import { editEvent } from "@event-calendar-controllers/edit-event.controller";
import { getAllEvents } from "@event-calendar-controllers/get-all.controller";

const router = express.Router();
router.get("/", getAllEvents);
router.post("/", createEvent);
router.put("/:id", editEvent);
router.delete("/:id", deleteEvent);
export default router;
