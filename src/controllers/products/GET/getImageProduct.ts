import { Request, Response } from "express";

export const getImageProduct = async (req: Request, res: Response) => {
  const user_id = req.user;
  const query = req.query;
  if (!user_id) return res.status(400).json({ error: "Falta user_id" });
  if (!query.public_id)
    return res.status(400).json({ error: "Falta public_id" });
  if (typeof query.public_id !== "string")
    return res.status(400).json({ error: "public_id invalido" });
  const image_url = `${req.protocol}://${req.get(
    "host"
  )}/api/products/images/${query.public_id.replace(/\.[^/.]+$/, "")}`;

  if (!image_url) {
    return res.status(400).json({ error: "Invalid image URL" });
  }

  return res.status(200).json(image_url);
};
