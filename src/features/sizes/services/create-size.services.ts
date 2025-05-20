import { Uuid } from "types";
import { models } from "@lib/sequelize";

const Size = models.Size;

export const createSizeService = async (
  user_id: string,
  title: string,
  values: { value: string }[],
) => {
  const newSize = await Size.create({
    title,
    values: values.map((e: { value: string }) => {
      return { value: e.value, id: crypto.randomUUID() };
    }),
    user_id: user_id as Uuid,
  });
  return { status: 200, body: newSize };
};
