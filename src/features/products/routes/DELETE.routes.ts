import express from "express";
import { deleteProduct } from "@products-controllers/delete-product.controller";

const router = express.Router();

router.delete("/:id", deleteProduct);

export default router;
