import express from "express";
import { deleteVariationById } from "@variations-controllers/delete-variation.controller";

const router = express.Router();

router.delete("/:id", async (req, res) => {
  return deleteVariationById(req, res);
});

export default router;
