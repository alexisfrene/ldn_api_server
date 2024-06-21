import { Request, Response } from "express";
import db from "../../../lib/sequelize";
import { deleteImageToCloudinary } from "../../../lib/cloudinary";

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
