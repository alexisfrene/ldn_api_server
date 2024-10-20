import { Request, Response } from "express";
import { getSecureUrl, db } from "../../../lib";

const User = db.User;

export const getAllVariations = async (req: Request, res: Response) => {
  const user_id = req.user;
  const user = await User.findByPk(user_id);
  if (!user)
    return res.status(400).json({ error: true, message: "No autorizado" });
  const variations = await user?.getUserVariations();
  if (!variations)
    return res
      .status(400)
      .json({ error: true, message: "No se encontraron variaciones" });

  const variationsMapper = variations.map(
    (variation: {
      values: { images: string[]; label: string; id: string }[];
      variation_id: string;
      title: string;
    }) => {
      const values = variation.values.map(
        (collection: { images: string[]; label: string; id: string }) => {
          const images = collection.images.map((image: string) =>
            getSecureUrl(`variations/${image}`, user.user_id)
          );
          return {
            id: collection.id,
            label: collection.label,
            images,
          };
        }
      );

      return {
        variation_id: variation.variation_id,
        title: variation.title,
        values,
      };
    }
  );

  return res.status(200).json(variationsMapper);
};
