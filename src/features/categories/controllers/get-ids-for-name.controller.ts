import { Request, Response } from "express";
import { models } from "@lib";

const User = models.User;

export const getIdsForCategoryName = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { collection_item_name } = req.query;

  const user = await User.findByPk(user_id);

  if (!user || !user.getUserCategories) {
    return res
      .status(400)
      .json({ error: true, message: "El usuario no tiene categorías" });
  }

  const categories = await user.getUserCategories({
    order: [["category_id", "ASC"]],
  });

  console.log("params", collection_item_name);
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

  return res.status(200).json(selectedValue);
};
