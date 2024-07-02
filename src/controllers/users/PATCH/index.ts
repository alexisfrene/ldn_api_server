import { Request, Response } from "express";

export const changeAvatar = async (req: Request, res: Response) => {
  const { category_id, category_value } = req.body;
  try {
    return res.status(200).json({ category_id, category_value });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Error al buscar los productos" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { category_id, category_value } = req.body;
  try {
    return res.status(200).json({ category_id, category_value });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Error al buscar los productos" });
  }
};

export const recoveryPassword = async (req: Request, res: Response) => {
  const { category_id, category_value } = req.body;
  try {
    return res.status(200).json({ category_id, category_value });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Error al buscar los productos" });
  }
};

export const changeName = async (req: Request, res: Response) => {
  const { category_id, category_value } = req.body;
  try {
    return res.status(200).json({ category_id, category_value });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Error al buscar los productos" });
  }
};
