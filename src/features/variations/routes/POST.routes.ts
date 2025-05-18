import express from "express";
import { createVariation } from "@variations-controllers/create-variation.controller";
import { insertVariants } from "@variations-controllers/link-variation.controller";
import { upload } from "@lib/multer";

const router = express.Router();

router.post("/:id", upload.array("files", 10), async (req, res) => {
  const productId = req.query.product_id;
  const variationId = req.params.id;
  if (productId && variationId) {
    return insertVariants(req, res);
  } else {
    return res.status(400).json({ error: true, message: "Faltan parámetros" });
  }
});
router.post("/", upload.array("files", 10), createVariation);

export default router;
