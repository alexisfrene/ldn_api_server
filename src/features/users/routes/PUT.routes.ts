import express from "express";
import { editPreferenceInProductView } from "@users-controllers/get-product-view-preference.controller";

const router = express.Router();

router.put("/preference", editPreferenceInProductView);

export default router;
