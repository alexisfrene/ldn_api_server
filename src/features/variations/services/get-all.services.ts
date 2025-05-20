import { env } from "config/environment";
import { models } from "@lib/sequelize";

const User = models.User;

export const getAllVariationsService = async (user_id: string, req: any) => {
  const user = await User.findByPk(user_id);
  if (!user)
    return { status: 400, body: { error: true, message: "No autorizado" } };
  const variations = await user?.getUserVariations();
  if (!variations)
    return {
      status: 400,
      body: { error: true, message: "No se encontraron variaciones" },
    };

  const variationsMapper = variations.map(
    (variation: {
      values: { images: string[]; label: string; id: string }[];
      variation_id: string;
      title: string;
    }) => {
      const values = variation.values.map(
        (collection: { images: string[]; label: string; id: string }) => {
          const images = collection.images.map(
            (image: string) =>
              `${env === "production" ? "https" : req.protocol}://${req.get(
                "host",
              )}/api/variations/images/${image.replace(/\.[^/.]+$/, "")}`,
          );
          return {
            id: collection.id,
            label: collection.label,
            images,
          };
        },
      );

      return {
        variation_id: variation.variation_id,
        title: variation.title,
        values,
      };
    },
  );

  return { status: 200, body: variationsMapper };
};
