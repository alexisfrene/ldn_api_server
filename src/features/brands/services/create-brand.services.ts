import { Uuid } from "types";
import { models } from "@lib";

const { Brand } = models;

export async function createBrandService(
  userId: Uuid,
  title: string | undefined,
) {
  if (!title) throw new Error("TITLE_REQUIRED");

  return Brand.create({ title, user_id: userId });
}
