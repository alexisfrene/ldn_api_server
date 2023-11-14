const express = require("express");
const router = express.Router();
const { upload } = require("../lib/multer");
const productController = require("../controllers/productsControllers");
//GET
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);
//POST
router.post(
  "/products",
  upload.array("files", 10),
  productController.createProduct
);
//PUT
// router.put("/products/:id", productController.updateProduct);
//DELETE
router.delete("/products/:id", productController.deleteProductById);

module.exports = router;
