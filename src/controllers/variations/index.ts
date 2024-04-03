import { deleteProductById, removeCollection } from "./DELETE";
import { getAllProducts, getProductById, getProductsForCategory } from "./GET";
import { editVariationsDetails } from "./PATCH";
import { createProduct, insertIdImagesVariants } from "./POST";
import { updateProduct, addVariation, updateCollection } from "./PUT";

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
  editVariationsDetails,
  updateCollection,
};
