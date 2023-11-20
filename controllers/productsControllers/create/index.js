const ProductModel = require("../../../models/Products");
const { handlerImageDestination } = require("./handlerImageDestination");
const { v4: uuidv4 } = require("uuid");

exports.createProduct = async (req, res) => {
  try {
    const { description, category, mainImage, details, collection } = req.body;
    const categoryFolder = category.replace(/\s+/g, "-").toLowerCase();
    const productFolder = collection.replace(/\s+/g, "-").toLowerCase();
    const { direction, primaryImage } = handlerImageDestination(
      categoryFolder,
      productFolder,
      req.files,
      mainImage
    );
    const miniatureUrl = direction.shift();
    const variations = [
      {
        name: collection,
        images: direction,
        id: uuidv4(),
      },
    ];
    await ProductModel.create({
      primaryImage,
      description,
      variations,
      category,
      miniatureImage: miniatureUrl,
      details,
    });
    res.send({ data: "Imagen cargada", description, category });
  } catch (error) {
    console.log("Error en crear un producto:", error);
  }
};
