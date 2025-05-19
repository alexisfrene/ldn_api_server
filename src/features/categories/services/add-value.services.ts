import { uploadToMinio } from "@lib/minio";
import { models } from "@lib/sequelize";

const Category = models.Category;
const User = models.User;

export const addCategoryValueService = async (
  user_id: string,
  category_id: string,
  value: string,
  files: Express.Multer.File[],
) => {
  if (!value)
    return { status: 400, body: { error: true, message: "Fatal value" } };
  if (!user_id)
    return {
      status: 401,
      body: { error: true, message: "Usuario no autorizado" },
    };
  if (!category_id)
    return {
      status: 400,
      body: { error: true, message: "No se proporciono un id de categoría" },
    };
  if (!files) return { status: 400, body: { error: "Fatal image" } };

  const user = await User.findByPk(user_id);
  if (!user)
    return {
      status: 400,
      body: { error: true, message: "Usuario no encontrado" },
    };

  const userCategories = await user.getUserCategories();
  const validateExistCategory = userCategories.find(
    (category) => category.category_id === Number(category_id),
  );
  if (!validateExistCategory)
    return {
      status: 400,
      body: { error: true, message: "La categoría no existe en el usuario" },
    };

  const selectedCategory = await Category.findByPk(category_id);
  const validateRepeatValue = selectedCategory!.values.find(
    (e: { value: string }) => e.value === value,
  );
  if (validateRepeatValue)
    return {
      status: 400,
      body: {
        error: true,
        message: `Èl valor ( ${value} , ya esta cargado )`,
      },
    };

  if (category_id !== "Default") {
    const icon_url = files[0].filename;
    await uploadToMinio(files[0], `${user_id}/categories`, user_id);
    if (!icon_url)
      return {
        status: 400,
        body: { error: true, message: "No se puedo subir el icono" },
      };
    const newValue = {
      id: crypto.randomUUID(),
      value,
      icon_url,
    };

    const updateCategory = await selectedCategory!.update({
      values: [...selectedCategory!.values, newValue],
    });

    return {
      status: 200,
      body: { msj: "Hola", updateCategory, files: files[0] },
    };
  }
  return { status: 200, body: { msj: "Hola" } };
};
