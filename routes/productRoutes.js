const express = require("express");
const router = express.Router();
const { upload } = require("../lib/multer");
const productController = require("../controllers/productsControllers");
//GET
router.get("/products", async (req, res) => {
  const category = req.query.category;
  if (category) {
    return productController.getProductsForCategory(req, res);
  } else {
    return productController.getAllProducts(req, res);
  }
});
router.get("/products/:id", productController.getProductById);
//POST
router.post("/products", upload.array("files", 10), async (req, res) => {
  const productId = req.query.product_id;
  if (productId) {
    return productController.insertIdImagesVariants(req, res);
  } else {
    return productController.createProduct(req, res);
  }
});
//PUT
// router.put("/products/:id", productController.updateProduct);
//DELETE
router.delete("/products/:id", productController.deleteProductById);

module.exports = router;
