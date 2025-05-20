import express from "express";
import { getAllSizes } from "@sizes-controllers/get-all.controller";
import { getIdsForSizeName } from "@sizes-controllers/get-size-by-name.controller";

const router = express.Router();

router.get("/", (req, res) => {
  const { collection_item_name } = req.query;
  console.log("collection_item_name", collection_item_name);
  if (collection_item_name) {
    return getIdsForSizeName(req, res);
  } else {
    return getAllSizes(req, res);
  }
});

export default router;
