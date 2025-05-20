import { Request, Response } from "express";
import { addImagesCollectionService } from "../services/add-collection-image.services";

export const addImagesCollection = async (req: Request, res: Response) => {
  const { id: variationId } = req.params;
  const { collection_id } = req.query;
  const user_id = req.user;
  const file = req.file as Express.Multer.File;
  const result = await addImagesCollectionService(
    variationId,
    collection_id as string,
    user_id,
    file,
  );
  return res.status(result.status).json(result.body);
};
