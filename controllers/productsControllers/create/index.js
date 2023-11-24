const { supabase } = require("../../../lib/supabase");
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
    const { data, error } = await supabase.from("ldn_image_manager").insert([
      {
        primary_image: primaryImage,
        category,
        miniature_image: miniatureUrl,
        variations,
        description,
        details,
      },
    ]);
    if (!error) res.send({ data });
  } catch (error) {
    console.log("Error en crear un producto:", error);
  }
};

exports.insertIdImagesVariants = async (req, res) => {
  try {
    const { product_id, product_image_id } = req.query;
    const { data } = await supabase
      .from("ldn_producs")
      .update({ produc_variations: product_image_id })
      .eq("id", product_id);
    res.send({ product_id, product_image_id, data });
  } catch (error) {}
};
