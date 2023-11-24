const { createProduct, insertIdImagesVariants } = require("./create");
const {
  getAllProducts,
  getProductById,
  getProductsForCategory,
} = require("./read");
const { deleteProductById } = require("./delete");

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  getProductsForCategory,
  insertIdImagesVariants,
};
