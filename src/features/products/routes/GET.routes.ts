import axios from "axios";
import express, { Request, Response } from "express";
import sharp from "sharp";
import { getAllProducts } from "@products-controllers/get-all.controller";
import { getProductById } from "@products-controllers/get-by-id.controller";
import { getImageProduct } from "@products-controllers/get-image.controller";
import { getProductForCategory } from "@products-controllers/get-product-by-category.controller";
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
      const imageUrl = await getTemporaryUrl(`${userId}/products/${fileName}`);
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

router.get("/", async (req, res) => {
  const { category_value, category_id } = req.query;
  if (category_id && category_value) {
    return getProductForCategory(req, res);
  }
  return getAllProducts(req, res);
});

router.get("/:id", getProductById);

router.get("/image", getImageProduct);

export default router;
