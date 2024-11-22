import { Request, Response } from "express";
import { hashPassword } from "@utils";
import { models } from "@lib";

const User = models.User;
const Category = models.Category;
const Size = models.Size;

export const createUser = async (req: Request, res: Response) => {
  const {
    first_name,
    last_name,
    email,
    password,
    gender,
    username,
    birthday_date,
  }: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    gender: "male" | "female" | "unspecified";
    username: string;
    birthday_date: Date;
  } = req.body;
  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !gender ||
    !username ||
    !birthday_date
  ) {
    return res
      .status(400)
      .json({ error: "Missing fields required to create the user" });
  }
  const validateEmail = await User.findAll({
    where: {
      email,
    },
  });
  const validateUserName = await User.findAll({
    where: {
      username,
    },
  });
  if (!!validateUserName.length || !!validateEmail.length)
    return res
      .status(400)
      .json({ message: "Username or email is already registered" });
  if (password.length < 8)
    return res
      .status(400)
      .json({ message: "The password must be a minimum of 8 in length" });
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

  await Category.create({
    title: "Default",
    values: [
      {
        id: "default",
        value: "Sin categoría",
        icon_url: "categories/default",
      },
    ],
    user_id: newUser.user_id,
  });

  await Size.create({
    title: "Default",
    values: [
      {
        id: "100",
        value: "Sin talla/numero",
      },
    ],
    user_id: newUser.user_id,
  });

  return res.status(201).send({ message: "User create" });
};
