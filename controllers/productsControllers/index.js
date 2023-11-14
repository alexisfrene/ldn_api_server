const { createProduct } = require("./create");
const { getAllProducts, getProductById } = require("./read");
const { deleteProductById } = require("./delete");

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
};
