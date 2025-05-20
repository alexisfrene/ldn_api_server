import { Request, Response } from "express";
import { removeImagesCollectionService } from "../services/delete-collection-image.services";

export const removeImagesCollection = async (req: Request, res: Response) => {
  const { id: variationId } = req.params;
  const { collection_id } = req.query;
  const { public_id } = req.body;
  const user_id = req.user;

  const result = await removeImagesCollectionService(
    variationId,
    collection_id as string,
    public_id,
    user_id,
  );
  return res.status(result.status).json(result.body);
};
