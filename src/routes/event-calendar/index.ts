import express from "express";
import eventCalendarRoutes from "@event-calendar-routes/event-calendar.routes";
import { asyncHandler, authenticateToken } from "@middlewares";

const router = express.Router();

router.use(
  "/event-calendar",
  authenticateToken,
  asyncHandler(async (req, res, next) => eventCalendarRoutes(req, res, next)),
);

export { router };
