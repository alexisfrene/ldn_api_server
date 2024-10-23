import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@lib";

const User = db.User;

export const userLogin = async (req: Request, res: Response) => {
  const { email_or_user, password } = req.body;
  let emailOrUser: "email" | "username" | "" = "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isUsername = /^[a-zA-Z0-9_]+$/;
  if (emailRegex.test(email_or_user)) {
    emailOrUser = "email";
  }
  if (isUsername.test(email_or_user)) {
    emailOrUser = "username";
  }

  if (emailOrUser.length) {
    const userSearch = (await User.findOne({
      where: {
        [emailOrUser]: email_or_user,
      },
      attributes: ["password_hash", "user_id"],
      raw: true,
    })) as { password_hash?: string; user_id?: string };
    if (userSearch) {
      const isPasswordValid = await bcrypt.compare(
        password,
        userSearch?.password_hash || ""
      );
      if (isPasswordValid && process.env.JWT_SECRET) {
        const token = jwt.sign(
          { user_id: userSearch.user_id },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        await User.update(
          { session_token: token },
          { where: { user_id: userSearch.user_id } }
        );
        const session_token = await User.findByPk(userSearch.user_id, {
          attributes: ["session_token"],
        });

        return res.status(200).json({ data: session_token });
      } else {
        return res.status(400).json({ message: "Invalid password" });
      }
    } else {
      return res.status(400).json({ message: "invalid user or email" });
    }
  } else {
    return res.status(400).json({ message: "invalid user or email" });
  }
};
