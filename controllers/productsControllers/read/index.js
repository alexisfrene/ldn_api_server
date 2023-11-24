//const ProductModel = require("../../../models/Products");
const { supabase } = require("../../../lib/supabase");

exports.getAllProducts = async (__, res) => {
  try {
    let { data, error } = await supabase.from("ldn_image_manager").select();
    if (!error) {
      res.json({ data });
    }
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    res.status(500).json({ error: "No se pudo obtener la lista de productos" });
  }
};

exports.getProductsForCategory = async (req, res) => {
  try {
    const param = req.query.category;

    let { data, error } = await supabase
      .from("ldn_image_manager")
      .select()
      .eq("category", param);
    if (!error) {
      res.json({ data });
    }
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    res.status(500).json({ error: "No se pudo obtener la lista de productos" });
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    let { data, error } = await supabase
      .from("ldn_image_manager")
      .select()
      .eq("id", productId);
    if (error) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.json({ data: data[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al buscar el producto", error: error.message });
  }
};
