import express from "express";
import { getAllEvents } from "@event-calendar-controllers/get-all.controller";

const router = express.Router();
router.get("/", getAllEvents);

export default router;
