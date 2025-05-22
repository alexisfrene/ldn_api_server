import { Request, Response } from "express";
import { Uuid } from "types";
import { createBrandService } from "@brands-services/create-brand.services";

export async function createBrandController(req: Request, res: Response) {
  try {
    const userId = req.user as Uuid;
    const { title } = req.body;

    const brand = await createBrandService(userId, title);

    return res.status(201).json(brand);
  } catch (err) {
    if (err instanceof Error && err.message === "TITLE_REQUIRED") {
      return res.status(400).json({ message: "Title is required." });
    }

    console.error("Error creating brand:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}
