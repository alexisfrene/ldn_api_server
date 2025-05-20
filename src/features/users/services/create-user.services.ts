import { Op } from "sequelize";
import { models } from "@lib/sequelize";
import { hashPassword, validateUserInput } from "@utils";

const { User, Category, Size } = models;

export const createUserService = async (body: any) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      username,
      birthday_date,
    } = body;

    const validationError = validateUserInput(body);
    if (validationError) {
      return { status: 400, body: { error: validationError } };
    }
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });
    if (existingUser) {
      return {
        status: 400,
        body: { message: "Username or email is already registered" },
      };
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

    return { status: 201, body: { message: "User created successfully" } };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: { error: "An error occurred while creating the user" },
    };
  }
};
