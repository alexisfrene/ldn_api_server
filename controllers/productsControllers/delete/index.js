const ProductModel = require("../../../models/Products");
const fs = require("fs");
const path = require("path");
const { deleteEmptyFolders } = require("./deleteEmptyFolders");

exports.deleteProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const productSelected = await ProductModel.findByPk(productId);
    if (!productSelected)
      return res.status(404).json({ message: "Producto no encontrado" });
    const { dataValues } = productSelected;
    if (dataValues.variations && dataValues.variations.length > 0) {
      dataValues.variations.forEach((image) => {
        const imagePath = path.join(__dirname, "../../../public/", image);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error al eliminar la imagen:", err);
          } else {
            console.log("Imagen eliminada:", image);
          }
        });
      });
      await deleteEmptyFolders(dataValues.variations[0]).then((res) => {
        deleteEmptyFolders(dataValues.variations[0], 2);
      });
    }
    const miniatureImagePath = path.join(
      __dirname,
      "../../../public/",
      dataValues.miniatureImage
    );
    fs.unlink(miniatureImagePath, (err) => {
      if (err) {
        console.error("Error al eliminar la miniatura:", err);
      } else {
        deleteEmptyFolders(dataValues.miniatureImage).then((res) => {
          deleteEmptyFolders(dataValues.miniatureImage, 2);
        });
        console.log("Miniatura eliminada:", dataValues.miniatureImage);
      }
    });
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
