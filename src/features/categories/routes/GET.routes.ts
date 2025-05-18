import express, { Request, Response } from "express";
import { getAllCategories } from "@categories-controllers/get-all.controller";
import { getByIdCategory } from "@categories-controllers/get-by-id.controller";
import { getIdsForCategoryName } from "@categories-controllers/get-ids-for-name.controller";
import { getByIdCategoryValue } from "@categories-controllers/get-value-by-id.controller";
import { getByIdValueImageURL } from "@categories-controllers/get-value-image-by-id.controller";
import { getByIdCategoryValidator } from "@categories-validators/category.get-by-id.validator";
import axios from "axios";
import { matchedData, validationResult } from "express-validator";
import sharp from "sharp";
import { runValidate } from "@middlewares";
import { getTemporaryUrl } from "@lib/minio";

const router = express.Router();

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
        `${userId}/categories/${fileName}`,
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
  },
);

router.get("/:id", runValidate(getByIdCategoryValidator), async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    if (data.type === "collection") return getByIdCategory(req, res);
    if (data.type === "value") return getByIdCategoryValue(req, res);
    if (data.type === "icon") return getByIdValueImageURL(req, res);
  }

  return res.status(400).json({ errors: result.array() });
});

router.get("/", (req, res) => {
  const { collection_item_name } = req.query;
  console.log("collection_item_name", collection_item_name);
  if (collection_item_name) {
    return getIdsForCategoryName(req, res);
  } else {
    return getAllCategories(req, res);
  }
});

export default router;
