import { Request, Response } from "express";
import { getSecureUrl, db } from "../../../lib";

const User = db.User;

export const getVariationById = async (req: Request, res: Response) => {
  const variationId = req.params.id;
  const userId = req.user;
  const user = await User.findByPk(userId);
  if (!user)
    return res.status(400).json({ error: true, message: "User no registrado" });
  if (!userId)
    return res
      .status(400)
      .json({ error: true, message: "Usuario no registrado" });
  const userVariations = await user.getVariations();
  if (!userVariations)
    return res
      .status(400)
      .json({ error: true, message: "No se encontró ninguna variación " });
  const variationSelected = userVariations.filter(
    (variation: { variation_id: string }) =>
      variation.variation_id === variationId
  );
  if (!variationSelected)
    return res
      .status(400)
      .json({ error: true, message: "No se encontró ninguna variación " });

  const values = variationSelected[0].values.map(
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

  return res.status(200).json({
    title: variationSelected[0].title,
    variation_id: variationSelected[0].variation_id,
    values,
  });
};
