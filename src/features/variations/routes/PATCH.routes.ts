import express, { NextFunction, Request, Response } from "express";
import { addImagesCollection } from "@variations-controllers/add-collection-image.controller";
import { insertNewCollection } from "@variations-controllers/create-collection.controller";
import { removeImagesCollection } from "@variations-controllers/delete-collection-image.controller";
import { upload } from "@lib/multer";

const router = express.Router();
const conditionalUpload = (req: Request, res: Response, next: NextFunction) => {
  const { edit } = req.query;
  if (edit === "add_collection") {
    return upload.array("files", 10)(req, res, next);
  } else {
    return upload.single("file")(req, res, next);
  }
};
router.patch("/:id", conditionalUpload, async (req, res) => {
  const { edit } = req.query;
  if (edit === "add_image") return addImagesCollection(req, res);
  if (edit === "add_collection") return insertNewCollection(req, res);
  if (edit === "remove_image") return removeImagesCollection(req, res);
  return res.status(500).json({ msj: "nada que ver pa" });
});

export default router;
