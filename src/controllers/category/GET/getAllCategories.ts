import { NextFunction, Request, Response } from "express";
import { getSecureUrl, models } from "@lib";

const User = models.User;

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user;

  if (!user_id) {
    // Manejo de errores: no autoridad
    return next(res.status(401).json({ error: "No authority" }));
  }

  try {
    const user = await User.findByPk(user_id);
    if (user) {
      const categories = await user.getUserCategories({
        order: [["category_id", "ASC"]],
      });

      const formatterCategories = categories.map((category) => {
        const values = category.values.map(
          (value: { icon_url: string; value: string; id: string }) => {
            return {
              icon_url:
                value.id === "default"
                  ? "https://res.cloudinary.com/daxkizsj3/image/upload/v1714359418/default_image.webp"
                  : getSecureUrl(value.icon_url, user_id!),
              value: value.value,
              id: value.id,
            };
          }
        );
        return {
          title: category.title,
          values,
          category_id: category.category_id,
        };
      });

      // Aquí no necesitas 'return', solo envías la respuesta y continúas el flujo
      res.status(200).json(formatterCategories);
    } else {
      // Usuario no encontrado, pasa el error al siguiente middleware
      next(
        res.status(400).json({ error: true, message: "Usuario no encontrado" })
      );
    }
  } catch (error) {
    // Si ocurre algún error inesperado, pasa el error al manejador de errores
    next(error);
  }
};
