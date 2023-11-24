const fs = require("fs").promises;
const path = require("path");
const { deleteEmptyFolders } = require("./deleteEmptyFolders");
const { supabase } = require("../../../lib/supabase");

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
    const { data, error } = await supabase
      .from("ldn_image_manager")
      .select("*")
      .eq("id", productId);
    if (error) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    const productSelected = data[0];
    if (productSelected.variations && productSelected.variations.length > 0) {
      await Promise.all(
        productSelected.variations.map(async (variation) => {
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
      productSelected.miniature_image
    );
    await removeImage(miniatureImagePath);
    await deleteEmptyFolders(productSelected.miniature_image);
    await deleteEmptyFolders(productSelected.miniature_image, 2);
    await supabase.from("ldn_image_manager").delete().eq("id", productId);
    return res
      .status(200)
      .json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar el producto", error: error.message });
  }
};
