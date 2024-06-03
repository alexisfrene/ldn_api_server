import express from "express";
import {
  addSizeValue,
  createSize,
  deleteSizeCollection,
  deleteSizeValue,
  getAllSizes,
  modifyTitleCollectionSize,
} from "../controllers";
import { authenticateToken } from "../middleware";

const router = express.Router();

router.get("/size", authenticateToken, getAllSizes);

router.post("/size", authenticateToken, createSize);

router.patch("/size/:id", authenticateToken, async (req, res) => {
  const query = req.query.type;
  if (query === "add") {
    return addSizeValue(req, res);
  }
  if (query === "title") {
    return modifyTitleCollectionSize(req, res);
  }
  return res
    .status(400)
    .json({ error: true, message: "No se proporciono una query" });
});

router.delete("/size/:id", authenticateToken, async (req, res) => {
  const type = req.query.type;
  if (type === "collection") {
    return deleteSizeCollection(req, res);
  }
  if (type === "value") {
    return deleteSizeValue(req, res);
  }
  return res
    .status(400)
    .json({ error: true, message: "No se especifico una typo de eliminación" });
});

export { router };
