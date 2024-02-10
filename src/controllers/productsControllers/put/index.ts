import { Request, Response } from "express";
import { supabase } from "../../../lib/supabase";
import { handlerImageDestination } from "../../../utils";
import { v4 as uuidv4 } from "uuid";

export const updateProduct = (req: Request, res: Response) => {
  const productId = req.params.id;
  res.send(`Producto con ID ${productId} actualizado`);
};

export const addVariation = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const { category, collection } = req.body;
  const files = req.files as Express.Multer.File[];
  const { direction } = handlerImageDestination({
    categoryFolder: category,
    productFolder: collection,
    files,
    withMiniature: false,
  });

  try {
    const { data, error } = await supabase
      .from("ldn_image_manager")
      .select("variations")
      .eq("id", productId)
      .single();

    if (error) {
      return res
        .status(400)
        .send({ message: "Error al obtener el registro original:" });
    }

    const { variations } = data;
    variations.push({
      id: uuidv4(),
      name: collection,
      images: direction,
    });

    const { data: updatedData, error: updateError } = await supabase
      .from("ldn_image_manager")
      .update({ variations })
      .eq("id", productId)
      .single();

    if (updateError) {
      return res
        .status(400)
        .send({ message: "Error al actualizar el registro:" });
    }

    return res
      .status(200)
      .send({ message: "Registro actualizado con éxito:", updatedData });
  } catch (error) {
    console.error("Error en addVariation:", error);
    return res.status(500).send({ message: "Error interno del servidor" });
  }
};
