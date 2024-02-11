import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { supabase } from "../../../lib/supabase";
import { handlerImageDestination, removeImage } from "../../../utils";

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
  const { name, images } = req.body;
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
    const variationSelected = data.variations.find(
      (variation: { id: string }) => variation.id === collectionId
    );
    const newCollection = data.variations.filter(
      (variation: { id: string }) => variation.id !== collectionId
    );
    if (name) {
      variationSelected.name = name;
      newCollection.push(variationSelected);
      const { data: updateName, error: errorUpdateName } = await supabase
        .from("ldn_image_manager")
        .update({ variations: newCollection })
        .eq("id", productId)
        .select();
      console.log(updateName, errorUpdateName);
    }

    if (images) {
      const remove = variationSelected.images.filter(
        (image: string) => !images.includes(image)
      );
      // const add = images.filter(
      //   (image: string) => !variationSelected.images.includes(image)
      // );

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
                newCollection.push(variationSelected);
                const { data, error } = await supabase
                  .from("ldn_image_manager")
                  .update({ variations: newCollection })
                  .eq("id", productId)
                  .select();
                console.log("H -->", data, error);
              }
            }
          })
        );

        console.log("-->", remove);
      }
      if (files) {
        const { data } = await supabase
          .from("ldn_image_manager")
          .select("*")
          .eq("id", productId)
          .single();

        const { direction } = handlerImageDestination({
          categoryFolder: data.category,
          productFolder: data.description,
          files,
          withMiniature: false,
        });
        if (direction.length) {
          variationSelected.images.push(direction);
          newCollection.push(variationSelected);
          const addImages = await supabase
            .from("ldn_image_manager")
            .update({ variations: newCollection })
            .eq("id", productId)
            .select();
          console.log("ADD --> ", addImages);
        }
      }
    }

    return res.status(200).json({
      data,
      rr: req.body,
      me: { primaryImage, miniatureImage, variationSelected },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
