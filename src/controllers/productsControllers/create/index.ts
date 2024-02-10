import { Request, Response } from "express";
import { supabase } from "../../../lib/supabase";
import { handlerImageDestination } from "../../../utils";
import { v4 as uuidv4 } from "uuid";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { description, category, mainImage, details, collection } = req.body;

    const categoryFolder = category.replace(/\s+/g, "-").toLowerCase();
    const productFolder = collection.replace(/\s+/g, "-").toLowerCase();
    const files = req.files as Express.Multer.File[];
    const { direction, primaryImage } = handlerImageDestination({
      categoryFolder,
      productFolder,
      files,
      mainImage,
    });
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

export const insertIdImagesVariants = async (req: Request, res: Response) => {
  try {
    const { product_id, product_image_id } = req.query;
    const { data } = await supabase
      .from("ldn_producs")
      .update({ produc_variations: product_image_id })
      .eq("id", product_id);
    res.send({ product_id, product_image_id, data });
  } catch (error) {
    console.log("Error en insertar ID de imágenes de variantes:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
