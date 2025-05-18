import express from "express";
import { preferenceInProductView } from "@users-controllers/get-product-view-preference.controller";

const router = express.Router();

router.put("/preference", preferenceInProductView);

export default router;
