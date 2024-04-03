import { Request, Response } from "express";
import { User } from "../../../lib/sequelize/models/Users";
// import { hashPassword } from "../../../utils";
// import { z } from "zod";
// const UserSchema = z.object({
//   username: z
//     .string()
//     .max(15)
//     .min(3)
//     .regex(/^[a-zA-Z0-9]+$/, "Username must contain only letters and numbers"),
//   email: z.string().email().max(50).min(3),
//   password: z.string().min(8),
//   full_name: z.string().max(50).optional(),
//   gender: z.enum(["male", "female", "unspecified"]),
// });

export const createUser = async (_: Request, res: Response) => {
  try {
    // UserSchema.parse(req.body);
    // const { username, email, full_name, gender, password } = req.body;
    // const password_hash = await hashPassword(password);
    // console.log(password_hash);

    const newUser = await User.create({
      birthday_date: "2024-03-24 01:13:36.173 +00:00",
      last_name: "asda",
      first_name: "sdas",
      config: "273c2f12-03e5-41c2-bd47-3ec2c0c569fd",
      username: "asdaffd",
      country: "asdasd",
      email: "asdads",
      recent_activity: "sdasd",
      phone_number: "asdasd",
      gender: "male",
      session_toke: "asdasd",
      password_hash: "sdasdasd",
      avatar_url: `default-avatar/asdad`,
      role: "admin",
      products_table: "dad",
    });
    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(400).send(error);
  }
};
