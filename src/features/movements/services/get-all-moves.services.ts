import { InferAttributes } from "sequelize";
import { models } from "@lib/sequelize";

const { Movement, PaymentMethod, FinancialAccount } = models;

type MovementWithRelations = InferAttributes<InstanceType<typeof Movement>> & {
  PaymentMethodMovements?: { name: string };
  FinancialAccountMovements?: { name: string };
};

export const getAllMovesService = async (
  user_id: string,
  page: number,
  limit: number,
) => {
  const offset = (page - 1) * limit;
  const { count, rows }: { count: number; rows: MovementWithRelations[] } =
    await Movement.findAndCountAll({
      where: {
        user_id: user_id,
      },
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
    });

  const formatted = rows.map((movement) => ({
    label: movement.label,
    value: movement.value,
    type: movement.type,
    payment_method:
      movement.PaymentMethodMovements?.name || "Sin método de pago",
    account: movement.FinancialAccountMovements?.name || "Sin cuenta",
    id: movement.movements_id,
    entry_date: movement.entry_date,
  }));

  return {
    status: 200,
    body: {
      movements: formatted,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalItems: count,
      limit,
    },
  };
};
