import { Request, Response } from "express";
import { getAllBrandsService } from "@brands-services/get-all-brands.services";

export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const user_id = req.user;

    const brands = await getAllBrandsService(user_id);

    return res.status(200).json(brands);
  } catch (error: any) {
    return res.status(error.status || 400).json({
      message: error.message || "Error getting brands",
      error: true,
    });
  }
};
