import { Uuid } from "types";
import { uploadToMinio } from "@lib/minio";
import { models } from "@lib/sequelize";

const Category = models.Category;

export const createCategoryService = async (
  user_id: string,
  title: string,
  values: string[],
  files: Express.Multer.File[],
) => {
  if (!files) return { status: 400, body: { error: "Fatal image" } };

  const uploadPromises = files.map(async (file, index) => {
    await uploadToMinio(file, `${user_id}/categories`, user_id as string);

    return {
      id: crypto.randomUUID(),
      value: values[index],
      icon_url: `${files[index].filename}`,
    };
  });

  const valuesFormatter: {
    id: string;
    value: string;
    icon_url: string;
  }[] = await Promise.all(uploadPromises);

  const newCategory = {
    title,
    values: valuesFormatter,
    user_id: user_id as Uuid,
  };
  const category = await Category.create(newCategory);

  return { status: 200, body: { category } };
};
