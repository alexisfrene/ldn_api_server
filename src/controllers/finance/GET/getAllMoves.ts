import { Request, Response } from "express";
import { models } from "@lib";
import { InferAttributes } from "sequelize";
import { Movement } from "@models/Movements";

const { User, PaymentMethod, FinancialAccount } = models;
type MovementWithRelations = InferAttributes<Movement> & {
  PaymentMethodMovements?: { name: string };
  FinancialAccountMovements?: { name: string };
};
export const getAllMoves = async (req: Request, res: Response) => {
  const user_id = req.user;
  const user = await User.findByPk(user_id);
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  const movements: MovementWithRelations[] = user
    ? await user.getUserMovements({
        attributes: [
          "movements_id",
          "label",
          "value",
          "type",
          "entry_date",
          "payment_method_id",
          "financial_accounts_id",
        ],
        include: [
          {
            model: PaymentMethod,
            as: "PaymentMethodMovements",
            attributes: ["name"],
          },
          {
            model: FinancialAccount,
            as: "FinancialAccountMovements",
            attributes: ["name"],
          },
        ],
        order: [
          ["entry_date", "DESC"],
          ["createdAt", "DESC"],
        ],
        limit,
        offset,
      })
    : [];

  const formatted = movements.map(movement => ({
    label: movement.label,
    value: movement.value,
    type: movement.type,
    payment_method:
      movement.PaymentMethodMovements?.name || "Sin método de pago",
    account: movement.FinancialAccountMovements?.name || "Sin cuenta",
    id: movement.movements_id,
    entry_date: movement.entry_date,
  }));
  return res.status(200).json(formatted);
};
