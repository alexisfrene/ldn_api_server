import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { supabase } from "../../../lib";
import {
  deleteEmptyFolders,
  handlerImageDestination,
  removeImage,
} from "../../../utils";

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

export const updateCollection = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const collectionId = req.query.id_collection;
  const body = req.body;
  const files = req.files as Express.Multer.File[];
  try {
    const { data, error } = await supabase
      .from("ldn_image_manager")
      .select("*")
      .eq("id", productId)
      .single();
    if (error) return res.status(400).json(error);
    const primaryImage = data.primary_image;
    const miniatureImage = data.miniature_image;
    let variationSelected = data.variations.find(
      (variation: { id: string }) => variation.id === collectionId
    );
    const newCollection = data.variations.filter(
      (variation: { id: string }) => variation.id !== collectionId
    );
    if (body?.name !== variationSelected.name) {
      variationSelected.name = body.name;
    }
    if (body?.images) {
      if (typeof body?.images === "string") {
        body.images = [body.images];
      }
      const remove = variationSelected.images.filter(
        (image: string) => !body?.images.includes(image)
      );
      if (remove.length) {
        await Promise.all(
          remove.map(async (url: string) => {
            if (url !== primaryImage) {
              const imagePath = path.join(
                __dirname,
                "../../../../public/",
                url
              );
              const res = await removeImage(imagePath);
              if (res.OK) {
                variationSelected.images = variationSelected.images.filter(
                  (e: string) => e !== url
                );
                await deleteEmptyFolders(url);
                await deleteEmptyFolders(url, 2);
              }
            }
          })
        );
      }
    } else {
      await Promise.all(
        variationSelected.images.map(async (url: string) => {
          if (url !== primaryImage) {
            const imagePath = path.join(__dirname, "../../../../public/", url);
            const res = await removeImage(imagePath);
            if (res.OK) {
              await deleteEmptyFolders(url);
              await deleteEmptyFolders(url, 2);
            }
          }
        })
      );

      variationSelected.images = [];
    }

    if (files.length) {
      const { direction } = handlerImageDestination({
        categoryFolder: data.category,
        productFolder: body?.name || variationSelected.name,
        files,
        withMiniature: false,
      });
      direction.map((url) => variationSelected.images.push(url));
    }
    newCollection.push(variationSelected);
    await supabase
      .from("ldn_image_manager")
      .update({ variations: newCollection })
      .eq("id", productId)
      .select();

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
