import express, { NextFunction, Request, Response } from "express";
import {
  getAllVariations,
  insertVariants,
  createVariation,
  updateProduct,
  deleteVariationById,
  getVariationById,
  addImagesCollection,
  getVariationForCategory,
  removeImagesCollection,
  insertNewCollection,
} from "../../controllers";
import { upload } from "../../lib";

const router = express.Router();

const conditionalUpload = (req: Request, res: Response, next: NextFunction) => {
  const { edit } = req.query;
  if (edit === "add_collection") {
    return upload.array("files", 10)(req, res, next);
  } else {
    return upload.single("file")(req, res, next);
  }
};

router.get("/", async (req, res, next) => {
  const { query } = req;
  if (query.category && query.value) {
    return getVariationForCategory(req, res, next);
  } else {
    return getAllVariations(req, res, next);
  }
});
router.get("/:id", getVariationById);
router.post("/:id", upload.array("files", 10), async (req, res, next) => {
  const productId = req.query.product_id;
  const variationId = req.params.id;
  if (productId && variationId) {
    return insertVariants(req, res, next);
  } else {
    return res.status(400).json({ error: true, message: "Faltan parámetros" });
  }
});
router.post("/", upload.array("files", 10), createVariation);
router.put("/:id", upload.array("files", 10), async (req, res, next) => {
  return updateProduct(req, res, next);
});
router.patch("/:id", conditionalUpload, async (req, res, next) => {
  const { edit } = req.query;
  if (edit === "add_image") return addImagesCollection(req, res, next);
  if (edit === "add_collection") return insertNewCollection(req, res, next);
  if (edit === "remove_image") return removeImagesCollection(req, res, next);
  return res.status(500).json({ msj: "nada que ver pa" });
});

router.delete("/:id", async (req, res, next) => {
  return deleteVariationById(req, res, next);
});

export default router;
