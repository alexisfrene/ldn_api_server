import { Request, Response } from "express";
import { supabase } from "../../../lib";

export const editVariationsDetails = async (req: Request, res: Response) => {
  const { id: productId } = req.params;

  try {
    const { data, error } = await supabase
      .from("ldn_image_manager")
      .select("details")
      .eq("id", productId)
      .single();

    if (error) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado", ok: false });
    }

    const body = req.body;
    const { details } = data;

    if (details) {
      for (const key in body) {
        details[key] = body[key];
      }

      const { error: updateError } = await supabase
        .from("ldn_image_manager")
        .update({ details })
        .eq("id", productId)
        .select();

      if (updateError) {
        return res
          .status(404)
          .json({ message: "Error al actualizar el producto", ok: false });
      }

      return res.status(200).json({ ok: true });
    }

    return res.status(200).json({ msj: data, body: body });
  } catch (error) {
    console.error("Error en editVariationsDetails:", error);
    return res.status(400).json({ msj: "Nada que ver pa", ok: false });
  }
};
