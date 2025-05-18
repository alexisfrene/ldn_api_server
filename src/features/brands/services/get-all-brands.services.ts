import { models } from "@lib/sequelize";

const User = models.User;

export const getAllBrandsService = async (user_id: string) => {
  if (!user_id) {
    throw { status: 401, message: "No authority" };
  }

  const user = await User.findByPk(user_id);

  if (!user) {
    throw { status: 404, message: "User not found" };
  }

  const brands = await user.getUserBrands({ order: [["brand_id", "ASC"]] });

  return brands;
};
