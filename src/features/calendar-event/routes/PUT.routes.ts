import express from "express";
import { editEvent } from "@event-calendar-controllers/edit-event.controller";

const router = express.Router();

router.put("/:id", editEvent);

export default router;
