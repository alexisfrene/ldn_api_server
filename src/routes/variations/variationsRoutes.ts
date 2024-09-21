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

router.get("/", async (req, res) => {
  const { query } = req;
  if (query.category && query.value) {
    return getVariationForCategory(req, res);
  } else {
    return getAllVariations(req, res);
  }
});
router.get("/:id", getVariationById);
router.post(
  "/:id",
  upload.array("files", 10),
  async (req: Request, res: Response) => {
    const productId = req.query.product_id;
    const variationId = req.params.id;
    if (productId && variationId) {
      return insertVariants(req, res);
    } else {
      return res
        .status(400)
        .json({ error: true, message: "Faltan parámetros" });
    }
  }
);
router.post("/", upload.array("files", 10), createVariation);
router.put(
  "/:id",
  upload.array("files", 10),
  async (req: Request, res: Response) => {
    return updateProduct(req, res);
  }
);
router.patch("/:id", conditionalUpload, async (req: Request, res: Response) => {
  const { edit } = req.query;
  if (edit === "add_image") return addImagesCollection(req, res);
  if (edit === "add_collection") return insertNewCollection(req, res);
  if (edit === "remove_image") return removeImagesCollection(req, res);
  return res.status(500).json({ msj: "nada que ver pa" });
});

router.delete("/:id", async (req: Request, res: Response) => {
  return deleteVariationById(req, res);
});

export default router;
