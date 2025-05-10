import { Request, Response } from "express";
import { Op } from "sequelize";
import { models } from "@lib";
import { hashPassword, validateUserInput } from "@utils";

const { User, Category, Size } = models;

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      username,
      birthday_date,
    } = req.body;

    const validationError = validateUserInput(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email is already registered" });
    }
    const password_hash = await hashPassword(password);
    const avatar_url = `https://res.cloudinary.com/ldn-img/image/upload/v1711132173/default-avatar/${gender.toLowerCase()}.webp`;
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password_hash,
      gender,
      username,
      birthday_date,
      avatar_url,
      recent_activity: [],
    });
    await Promise.all([
      Category.create({
        title: "Default",
        values: [
          {
            id: "default",
            value: "Sin categoría",
            icon_url: "categories/default",
          },
        ],
        user_id: newUser.user_id,
      }),
      Size.create({
        title: "Default",
        values: [{ id: "100", value: "Sin talla/numero" }],
        user_id: newUser.user_id,
      }),
    ]);

    return res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};
