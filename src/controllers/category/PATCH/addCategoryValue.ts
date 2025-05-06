import { Request, Response } from "express";
import { models } from "@lib";
import { uploadToMinio } from "@lib/minio";

const Category = models.Category;
const User = models.User;

export const addCategoryValue = async (req: Request, res: Response) => {
  const category_id = req.params.id;
  const user_id = req.user;
  const { value } = req.body;

  if (!value)
    return res.status(400).json({ error: true, message: "Fatal value" });

  if (!user_id)
    return res
      .status(401)
      .json({ error: true, message: "Usuario no autorizado" });
  if (!category_id)
    return res
      .status(400)
      .json({ error: true, message: "No se proporciono un id de categoría" });
  const files = req.files as Express.Multer.File[];
  if (!files) return res.status(400).json({ error: "Fatal image" });
  const user = await User.findByPk(user_id);
  if (user) {
    const userCategories = await user.getUserCategories();
    const validateExistCategory = userCategories.find(
      category => category.category_id === Number(category_id)
    );
    if (!validateExistCategory)
      return res
        .status(400)
        .json({ error: true, message: "La categoría no existe en el usuario" });
    const selectedCategory = await Category.findByPk(category_id);

    const validateRepeatValue = selectedCategory!.values.find(
      (e: { value: string }) => e.value === value
    );
    if (validateRepeatValue)
      return res.status(400).json({
        error: true,
        message: `Èl valor ( ${value} , ya esta cargado )`,
      });
    if (category_id !== "Default") {
      const icon_url = files[0].filename;
      await uploadToMinio(files[0], `${user_id}/categories`, user_id);
      if (!icon_url)
        return res
          .status(400)
          .json({ error: true, message: "No se puedo subir el icono" });
      const newValue = {
        id: crypto.randomUUID(),
        value,
        icon_url,
      };

      const updateCategory = selectedCategory!.update({
        values: [...selectedCategory!.values, newValue],
      });

      return res
        .status(200)
        .json({ msj: "Hola", updateCategory, files: files[0] });
    }
    return res.status(200).json({ msj: "Hola" });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Usuario no encontrado" });
  }
};
