import { models } from "@lib/sequelize";

const User = models.User;

export const getIdsForCategoryNameService = async (
  user_id: string,
  collection_item_name: string,
) => {
  const user = await User.findByPk(user_id);

  if (!user || !user.getUserCategories) {
    return {
      status: 400,
      body: { error: true, message: "El usuario no tiene categorías" },
    };
  }

  const categories = await user.getUserCategories({
    order: [["category_id", "ASC"]],
  });

  let selectedValue = {};
  categories.forEach((category) => {
    const searchedValue = category.values.find(
      (value) => value.value === collection_item_name,
    );

    if (searchedValue) {
      selectedValue = {
        category_id: category.category_id,
        value_id: searchedValue.id,
      };
    }
  });

  return { status: 200, body: selectedValue };
};
