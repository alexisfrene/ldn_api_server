import { Request, Response } from "express";
import { models } from "@lib";
import { Uuid } from "types";
const { Brand } = models;

export const createBrand = async (req: Request, res: Response) => {
  try {
    const user_id = req.user as Uuid;
    const body = req.body;

    if (!body?.title) {
      return res.status(400).json({ message: "Title is required." });
    }

    const brand = await Brand.create({
      title: body?.title,
      user_id,
    });

    return res.status(201).json(brand);
  } catch (error) {
    console.error("Error creating brand:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
