import { models } from "@lib/sequelize";

const User = models.User;

export const getIdsForSizeNameService = async (
  user_id: string,
  collection_item_name: string,
) => {
  const user = await User.findByPk(user_id);

  if (!user || !user.getUserSizes) {
    return {
      status: 400,
      body: { error: true, message: "El usuario no tiene tallas" },
    };
  }

  const sizes = await user.getUserSizes({ order: [["size_id", "ASC"]] });

  let selectedValue = {};
  sizes.forEach((size) => {
    const searchedValue = size.values.find(
      (value) => value.value === collection_item_name,
    );

    if (searchedValue) {
      selectedValue = {
        size_id: size.size_id,
        value_id: searchedValue.id,
      };
    }
  });

  return { status: 200, body: selectedValue };
};
