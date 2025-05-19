import { models } from "@lib/sequelize";

const User = models.User;

export const getAllSizesService = async (user_id: string) => {
  if (!user_id) {
    return { status: 401, body: { message: "No authority", error: true } };
  }
  const user = await User.findByPk(user_id);

  if (!user) {
    return { status: 404, body: { message: "User not found", error: true } };
  }

  const sizes = await user.getUserSizes({ order: [["size_id", "ASC"]] });

  return { status: 200, body: sizes };
};
