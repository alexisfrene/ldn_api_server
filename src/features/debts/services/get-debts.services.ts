import { models } from "@lib/sequelize";

const { Debt, Installment } = models;

export const getAllDebtsService = async (
  user_id: string,
  page: number,
  limit: number,
) => {
  const offset = (page - 1) * limit;

  const { count, rows: debts } = await Debt.findAndCountAll({
    where: { user_id },
    attributes: ["debt_id"],
    limit,
    offset,
    order: [
      ["updatedAt", "DESC"],
      ["createdAt", "DESC"],
    ],
  });
  const fullDebts = await Debt.findAll({
    where: {
      debt_id: debts.map((d) => d.debt_id),
    },
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
        required: true,
      },
    ],
    attributes: [
      "debt_id",
      "name",
      "total_interest",
      "interest_per_installment",
      "notes",
    ],
    group: ["Debt.debt_id", "DebtInstallments.installment_id"],
    order: [
      ["updatedAt", "DESC"],
      ["createdAt", "DESC"],
    ],
  });

  const formattedDebts = fullDebts.map((debt: any) => {
    let dp = 0;
    let du = 0;

    debt.DebtInstallments.forEach((installment: any) => {
      if (installment.status === "paid") {
        dp += installment.amount;
      } else {
        du += installment.amount;
      }
    });

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
    status: 200,
    body: {
      debts: formattedDebts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalItems: count,
      limit,
    },
  };
};

export const getDebtsByIdService = async (id: string) => {
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

export const getStatsDebtsService = async (user_id: string) => {
  const debts = (await Debt.findAll({
    where: { user_id },
    include: [
      {
        model: Installment,
        as: "DebtInstallments",
        attributes: ["amount", "status"],
      },
    ],
    attributes: [],
  })) as any[];

  let totalPaid = 0;
  let totalUnpaid = 0;

  debts.forEach((debt) => {
    debt.DebtInstallments.forEach((installment) => {
      if (installment.status === "paid") {
        totalPaid += installment.amount;
      } else if (installment.status === "unpaid") {
        totalUnpaid += installment.amount;
      }
    });
  });

  return {
    debtsTotal: totalPaid + totalUnpaid,
    debtsTotalPaid: totalPaid,
    debtsTotalUnpaid: totalUnpaid,
  };
};
