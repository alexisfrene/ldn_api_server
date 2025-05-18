import { Request, Response } from "express";
import { models } from "@lib/sequelize";

const { FinancialAccount, FinancialAccountsPaymentMethods } = models;

export const editFinancialAccount = async (req: Request, res: Response) => {
  const financial_accounts_id = req.params.id;
  const { name, payments_methods = [] } = req.body;
  const user_id = req.user;
  const financialAccount = await FinancialAccount.findByPk(
    financial_accounts_id,
  );

  if (!financialAccount) {
    return res.status(404).json({ message: "Cuenta financiera no encontrada" });
  }

  if (financialAccount.user_id !== user_id) {
    return res.status(403).json({
      message: "No tienes permiso para editar esta cuenta financiera.",
    });
  }
  if (name) {
    financialAccount.name = name;
  }
  const currentRelations = await FinancialAccountsPaymentMethods.findAll({
    where: { financial_accounts_id },
    attributes: ["payment_method_id"],
  });
  const currentPaymentMethods = currentRelations.map(
    (relation) => relation.payment_method_id,
  );
  const methodsToAdd = payments_methods.filter(
    (id: number) => !currentPaymentMethods.includes(id),
  );
  const methodsToRemove = currentPaymentMethods.filter(
    (id: number) => !payments_methods.includes(id),
  );
  if (methodsToRemove.length) {
    await FinancialAccountsPaymentMethods.destroy({
      where: {
        financial_accounts_id,
        payment_method_id: methodsToRemove,
      },
    });
  }
  if (methodsToAdd.length) {
    const newRelations = methodsToAdd.map((id: number) => ({
      financial_accounts_id,
      payment_method_id: id,
    }));
    await FinancialAccountsPaymentMethods.bulkCreate(newRelations);
  }

  await financialAccount.save();

  return res.json({
    message: "Cuenta financiera actualizada",
    financialAccount,
  });
};
