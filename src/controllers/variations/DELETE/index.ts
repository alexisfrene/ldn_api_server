import { Request, Response } from "express";
import { deleteImageToCloudinary, db } from "../../../lib";
import { asyncHandler } from "../../../middleware";

const Variation = db.Variation;

export const deleteVariationById = asyncHandler(
  async (req: Request, res: Response) => {
    const variationId = req.params.id;
    const user_id = req.user;
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
      });
    });

    await variation.destroy();

    return res
      .status(200)
      .json({ message: "variación eliminado correctamente" });
  }
);
