import express from "express";
import { deleteEvent } from "@event-calendar-controllers/delete-event.controller";

const router = express.Router();

router.delete("/:id", deleteEvent);
export default router;
