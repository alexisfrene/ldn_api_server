import { Request, Response } from "express";
import db from "../../../lib/sequelize";

const User = db.User;

const getAllSizes = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(401).json({ message: "No authority", error: true });
  }

  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found", error: true });
    }

    const sizes = await user.getSizes({ order: [["size_id", "ASC"]] });

    return res.status(200).json(sizes);
  } catch (error) {
    console.error("Error fetching sizes:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
};

export { getAllSizes };
