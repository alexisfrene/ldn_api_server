const ProductModel = require("../../../models/Products");
const { handlerImageDestination } = require("./handlerImageDestination");

exports.createProduct = async (req, res) => {
  try {
    const { description, category, mainImage } = req.body;
    const categoryFolder = category.replace(/\s+/g, "-").toLowerCase();
    const productFolder = description.replace(/\s+/g, "-").toLowerCase();
    const { direction, primaryImage } = handlerImageDestination(
      categoryFolder,
      productFolder,
      req.files,
      mainImage
    );
    const miniatureUrl = direction.shift();
    await ProductModel.create({
      primaryImage,
      description,
      variations: direction,
      category,
      miniatureImage: miniatureUrl,
    });
    res.send({ data: "Imagen cargada", description, category });
  } catch (error) {
    console.log("Error en crear un producto:", error);
  }
};
