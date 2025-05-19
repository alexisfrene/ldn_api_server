import { Request, Response } from "express";
import { deleteFinancialAccountService } from "@accounts-services/delete-financial-account.services";

export const deleteFinancialAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req.user;
  try {
    const result = await deleteFinancialAccountService(user_id, id);
    if (result.notFound) {
      return res.status(404).json({
        message: "Cuenta financiera no encontrada",
        id,
      });
    }
    if (result.forbidden) {
      return res.status(403).json({
        message: "No tienes permiso para eliminar esta cuenta financiera.",
      });
    }
    return res.json({ message: "Cuenta financiera eliminada" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
