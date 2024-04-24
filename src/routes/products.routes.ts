import express, { Response } from "express";
import { createProducts } from "../controllers";
import { Product } from "../lib/sequelize/models";

const router = express.Router();

//GET
router.get("/products", async (__, res: Response) => {
  const allProducts = await Product.findAll({
    where: { user_id: "fe2f979a-be7c-4e57-8068-57a5004d8baf" },
    attributes: ["name", "description"],
  });
  return res.status(200).send(allProducts);
});
//POST
router.post("/products", createProducts);

export { router };
