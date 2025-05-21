import { Sequelize } from "sequelize";
import { models } from "@lib/sequelize";

const { Debt, Installment } = models;

export const getAllDebtsService = async (
  user_id: string,
  page: number,
  limit: number,
) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await Debt.findAndCountAll({
    where: { user_id },
    include: [
      {
        model: Installment,
        as: "DebtInstallments",
        attributes: [
          "installment_id",
          "amount",
          "due_date",
          "status",
          "debt_id",
        ],
        required: false,
      },
    ],
    attributes: [
      "debt_id",
      "name",
      "total_interest",
      "interest_per_installment",
      "notes",
      [
        Sequelize.fn(
          "SUM",
          Sequelize.literal(
            `CASE WHEN "DebtInstallments"."status" = 'paid' THEN "DebtInstallments"."amount" ELSE 0 END`,
          ),
        ),
        "total_paid",
      ],
      [
        Sequelize.fn(
          "SUM",
          Sequelize.literal(
            `CASE WHEN "DebtInstallments"."status" = 'unpaid' THEN "DebtInstallments"."amount" ELSE 0 END`,
          ),
        ),
        "total_unpaid",
      ],
    ],
    group: ["Debt.debt_id", "DebtInstallments.installment_id"],
    subQuery: false,
    limit,
    offset,
    order: [
      ["updatedAt", "DESC"],
      ["createdAt", "DESC"],
    ],
  });

  const totals = (await Installment.findOne({
    include: {
      model: Debt,
      as: "Debt",
      where: { user_id },
      attributes: [],
    },
    attributes: [
      [
        Sequelize.fn(
          "SUM",
          Sequelize.literal(`CASE WHEN status = 'paid' THEN amount ELSE 0 END`),
        ),
        "total_paid",
      ],
      [
        Sequelize.fn(
          "SUM",
          Sequelize.literal(
            `CASE WHEN status = 'unpaid' THEN amount ELSE 0 END`,
          ),
        ),
        "total_unpaid",
      ],
    ],
    raw: true,
  })) as any;

  count;
  const total_paid = Number(totals?.total_paid ?? 0);
  const total_unpaid = Number(totals?.total_unpaid ?? 0);
  const debtsTotal = total_paid + total_unpaid;

  const formattedDebts = rows.map((debt: any) => {
    const dp = Number(debt.get("total_paid")) || 0;
    const du = Number(debt.get("total_unpaid")) || 0;

    const installments = (debt.DebtInstallments || []).sort(
      (a: any, b: any) =>
        new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
    );

    return {
      name: debt.name,
      total: dp + du,
      total_paid: dp,
      total_unpaid: du,
      total_interest: debt.total_interest,
      interest_per_installment: debt.interest_per_installment,
      debt_id: debt.debt_id,
      notes: debt.notes,
      installments,
    };
  });

  return {
    debts: formattedDebts,
    debtsTotal,
    debtsTotalPaid: total_paid,
    debtsTotalUnpaid: total_unpaid,
  };
};

export const getDebtsByIdService = async (id: string) => {
  const { Debt, Installment } = models;
  const debt = await Debt.findByPk(id, {
    raw: true,
    attributes: { exclude: ["user_id", "createdAt", "updatedAt"] },
  });

  if (!debt) return null;
  const installments = await Installment.findAll({
    where: { debt_id: debt.debt_id },
    attributes: ["installment_id", "amount", "due_date", "status"],
    order: [["due_date", "ASC"]],
  });

  return {
    ...debt,
    installments: installments || [],
  };
};
