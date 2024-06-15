import { Request, Response } from "express";
import { supabase } from "../../../lib/supabase";
import db from "../../../lib/sequelize";
import { deleteEmptyFolders, removeImage } from "../../../utils";
import { deleteImageToCloudinary } from "../../../lib/cloudinary";

interface CollectionType {
  id: string;
  name: string;
  images: string[];
}

const Variation = db.Variation;

export const deleteVariationById = async (req: Request, res: Response) => {
  const variationId = req.params.id;
  const { user_id } = req.body;
  try {
    const variation = await Variation.findByPk(variationId);
    if (!user_id)
      return res.status(500).json({ message: "No autorizado", error: true });
    if (!variation) {
      return res
        .status(404)
        .json({ message: "variación no encontrado", error: true });
    }

    await variation.values.forEach(async (value: { images: string[] }) => {
      value.images.map(async (image: string) => {
        await deleteImageToCloudinary(`${user_id}/variations/${image}`);
        console.log("Variation -->", { url: `${user_id}/${image}` });
      });
    });

    await variation.destroy();

    return res
      .status(200)
      .json({ message: "variación eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el producto",
      error: error,
    });
  }
};

export const removeCollection = async (req: Request, res: Response) => {
  const collectionId = req.query.variation_remove;
  const variationsId = req.params.id;

  try {
    const { data, error } = await supabase
      .from("ldn_image_manager")
      .select("*")
      .eq("id", variationsId);

    if (!error && data) {
      const filteredCollection = data[0]?.variations
        .map((collection: { id: string }) =>
          collection.id !== collectionId ? collection : null
        )
        .filter((collection: CollectionType) => collection !== null);

      const { error: updateError } = await supabase
        .from("ldn_image_manager")
        .update({ variations: filteredCollection || [] })
        .eq("id", variationsId)
        .single();

      if (!updateError) {
        await Promise.all(
          data[0]?.variations.map(async (variation: CollectionType) => {
            if (variation.id === collectionId) {
              await Promise.all(
                variation.images.map(async (routeImage) => {
                  await removeImage(routeImage);
                })
              );
              await deleteEmptyFolders(variation.images[0]);
              await deleteEmptyFolders(variation.images[0], 2);
            }
          })
        );
      }
      return res.send("Collection eliminada");
    }
  } catch (error) {
    console.log("Error al eliminar la collection", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
  return res.status(500).json({ error: "Internal Server Error" });
};
