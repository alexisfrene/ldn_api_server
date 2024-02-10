import { Request, Response } from "express";
import { promises as fsPromises } from "fs";
import path from "path";
import { deleteEmptyFolders } from "./deleteEmptyFolders";
import { supabase } from "../../../lib/supabase";
import { constants, access } from "fs/promises";

const { unlink } = fsPromises;
interface CollectionType {
  id: string;
  name: string;
  images: string[];
}

const removeImage = async (imagePath: string) => {
  try {
    await access(imagePath, constants.F_OK);
    await unlink(imagePath);
    console.log("Imagen eliminada:", imagePath);
  } catch (error) {
    if (error === "ENOENT") {
      console.log("El archivo no existe:", imagePath);
    } else {
      console.error("Error al eliminar la imagen:", error);
    }
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const { data, error } = await supabase
      .from("ldn_image_manager")
      .select("*")
      .eq("id", productId);

    if (error) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    const productSelected = data[0];

    if (productSelected.variations && productSelected.variations.length > 0) {
      await Promise.all(
        productSelected.variations.map(
          async (variation: { images: string[] }) => {
            await Promise.all(
              variation.images.map(async (routeImage) => {
                const imagePath = path.join(
                  __dirname,
                  "../../../../public/",
                  routeImage
                );

                await removeImage(imagePath);
              })
            );
            await deleteEmptyFolders(variation.images[0]);
            await deleteEmptyFolders(variation.images[0], 2);
          }
        )
      );
    }
    const miniatureImagePath = path.join(
      __dirname,
      "../../../../public/",
      productSelected.miniature_image
    );
    await removeImage(miniatureImagePath);
    await deleteEmptyFolders(productSelected.miniature_image);
    await deleteEmptyFolders(productSelected.miniature_image, 2);

    await supabase.from("ldn_image_manager").delete().eq("id", productId);

    return res
      .status(200)
      .json({ message: "Producto eliminado correctamente" });
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
                  const imagePath = path.join(
                    __dirname,
                    "../../../../public/",
                    routeImage
                  );
                  await removeImage(imagePath);
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
