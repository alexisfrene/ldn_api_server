import { Request, Response } from "express";
import { editFinancialAccountService } from "@accounts-services/edit-financial-account.services";

export const editFinancialAccount = async (req: Request, res: Response) => {
  const financial_accounts_id = req.params.id;
  const { name, payments_methods = [] } = req.body;
  const user_id = req.user;
  try {
    const result = await editFinancialAccountService(
      user_id,
      financial_accounts_id,
      name,
      payments_methods,
    );
    if (result.notFound) {
      return res
        .status(404)
        .json({ message: "Cuenta financiera no encontrada" });
    }
    if (result.forbidden) {
      return res.status(403).json({
        message: "No tienes permiso para editar esta cuenta financiera.",
      });
    }
    return res.json({
      message: "Cuenta financiera actualizada",
      financialAccount: result.financialAccount,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
