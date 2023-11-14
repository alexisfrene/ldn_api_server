const ProductModel = require("../../../models/Products");

exports.getAllProducts = async (__, res) => {
  try {
    const products = await ProductModel.findAll();
    res.json({ products });
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    res.status(500).json({ error: "No se pudo obtener la lista de productos" });
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const productSelected = await ProductModel.findByPk(productId);

    if (!productSelected) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json(productSelected);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al buscar el producto", error: error.message });
  }
};
