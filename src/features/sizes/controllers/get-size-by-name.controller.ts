import { Request, Response } from "express";
import { models } from "@lib";

const User = models.User;

export const getIdsForSizeName = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { collection_item_name } = req.query;

  const user = await User.findByPk(user_id);

  if (!user || !user.getUserSizes) {
    return res
      .status(400)
      .json({ error: true, message: "El usuario no tiene tallas" });
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

  return res.status(200).json(selectedValue);
};
