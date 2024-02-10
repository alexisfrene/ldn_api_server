import { createProduct, insertIdImagesVariants } from "./create";
import { getAllProducts, getProductById, getProductsForCategory } from "./read";
import { deleteProductById, removeCollection } from "./delete";
import { updateProduct, addVariation } from "./put";

export {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  getProductsForCategory,
  insertIdImagesVariants,
  updateProduct,
  addVariation,
  removeCollection,
};
