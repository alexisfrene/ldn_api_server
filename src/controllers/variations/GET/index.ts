import { Request, Response } from "express";
import { supabase } from "../../../lib/supabase";

export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("ldn_image_manager")
      .select()
      .order("created_at", { ascending: false });
    if (!error) {
      return res.json({ data });
    }
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    res.status(500).json({ error: "No se pudo obtener la lista de productos" });
  }
  return [];
};

export const getProductsForCategory = async (req: Request, res: Response) => {
  try {
    const param = req.query.category;
    const { data, error } = await supabase
      .from("ldn_image_manager")
      .select()
      .eq("category", param)
      .order("created_at", { ascending: false });
    if (!error) {
      res.json({ data });
    }
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    return res
      .status(500)
      .json({ error: "No se pudo obtener la lista de productos" });
  }
  return;
};

export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const { data, error } = await supabase
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
      .json({ message: "Error al buscar el producto", error: error });
  }
};
