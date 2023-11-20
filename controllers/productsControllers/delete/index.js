const ProductModel = require("../../../models/Products");
const fs = require("fs").promises;
const path = require("path");
const { deleteEmptyFolders } = require("./deleteEmptyFolders");

const removeImage = async (imagePath) => {
  try {
    await fs.unlink(imagePath);
    console.log("Imagen eliminada:", imagePath);
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
  }
};

exports.deleteProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const productSelected = await ProductModel.findByPk(productId);
    if (!productSelected) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    const { dataValues } = productSelected;
    if (dataValues.variations && dataValues.variations.length > 0) {
      await Promise.all(
        dataValues.variations.map(async (variation) => {
          await Promise.all(
            variation.images.map(async (routeImage) => {
              const imagePath = path.join(
                __dirname,
                "../../../public/",
                routeImage
              );
              await removeImage(imagePath);
            })
          );
          await deleteEmptyFolders(variation.images[0]);
          await deleteEmptyFolders(variation.images[0], 2);
        })
      );
    }
    const miniatureImagePath = path.join(
      __dirname,
      "../../../public/",
      dataValues.miniatureImage
    );
    await removeImage(miniatureImagePath);
    await deleteEmptyFolders(dataValues.miniatureImage);
    await deleteEmptyFolders(dataValues.miniatureImage, 2);
    await productSelected.destroy();
    return res
      .status(200)
      .json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar el producto", error: error.message });
  }
};
