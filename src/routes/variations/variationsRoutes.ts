import express, { NextFunction, Request, Response } from "express";
import axios from "axios";
import { upload } from "@lib";
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
} from "@controllers";
import { getTemporaryUrl } from "@lib/minio";

const router = express.Router();
import sharp from "sharp";
interface ImageQuery {
  width?: string;
  height?: string;
  quality?: string;
  format?: string;
}

interface ImageParams {
  fileName: string;
}

router.get(
  "/images/:fileName",
  async (req: Request<ImageParams, any, any, ImageQuery>, res: Response) => {
    try {
      const { fileName } = req.params;
      const userId = req.user as string;
      let width = req.query.width ? parseInt(req.query.width) : undefined;
      let height = req.query.height ? parseInt(req.query.height) : undefined;
      let quality = req.query.quality ? parseInt(req.query.quality) : 80;
      let format = req.query.format || "webp";

      const validFormats: string[] = ["jpeg", "png", "webp"];
      if (!validFormats.includes(format as string)) {
        format = "webp";
      }
      const imageUrl = await getTemporaryUrl(
        `${userId}/variations/${fileName}`
      );
      if (!imageUrl) {
        return res.status(400).json({ error: "Invalid image URL" });
      }
      const response = await axios.get<ArrayBuffer>(imageUrl, {
        responseType: "arraybuffer",
      });
      let image = sharp(Buffer.from(response.data)).resize(width, height);

      if (format === "jpeg") {
        image = image.jpeg({ quality, mozjpeg: true });
      } else if (format === "png") {
        image = image.png({ quality });
      } else {
        image = image.webp({ quality });
      }

      const optimizedImage = await image.toBuffer();

      res.setHeader("Content-Type", `image/${format}`);
      return res.send(optimizedImage);
    } catch (error) {
      console.error("Error al obtener la imagen:", error);
      return res.status(500).json({ error: "No se pudo obtener la imagen" });
    }
  }
);

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
router.put("/:id", upload.array("files", 10), async (req, res) => {
  return updateProduct(req, res);
});
router.patch("/:id", conditionalUpload, async (req, res) => {
  const { edit } = req.query;
  if (edit === "add_image") return addImagesCollection(req, res);
  if (edit === "add_collection") return insertNewCollection(req, res);
  if (edit === "remove_image") return removeImagesCollection(req, res);
  return res.status(500).json({ msj: "nada que ver pa" });
});

router.delete("/:id", async (req, res) => {
  return deleteVariationById(req, res);
});

export default router;
