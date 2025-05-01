import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import { models } from "@lib";

const { Debt, Installment } = models;

export const getAllDebts = async (req: Request, res: Response) => {
  const user_id = req.user;

  const debts = await Debt.findAll({
    where: { user_id },
    attributes: [
      "debt_id",
      "name",
      "total_interest",
      "interest_per_installment",
      "notes",
    ],
  });

  if (debts.length === 0) {
    return res.status(200).json({
      debts: [],
      debtsTotal: 0,
      debtsTotalPaid: 0,
      debtsTotalUnpaid: 0,
    });
  }

  const sums = await Installment.findAll({
    where: {
      debt_id: {
        [Op.in]: debts.map(d => d.debt_id),
      },
    },
    attributes: [
      "debt_id",
      [
        Sequelize.fn(
          "SUM",
          Sequelize.literal(`CASE WHEN status = 'paid' THEN amount ELSE 0 END`)
        ),
        "total_paid",
      ],
      [
        Sequelize.fn(
          "SUM",
          Sequelize.literal(
            `CASE WHEN status = 'unpaid' THEN amount ELSE 0 END`
          )
        ),
        "total_unpaid",
      ],
    ],
    group: ["debt_id"],
    raw: true,
  });

  const sumsMap = new Map<
    string,
    { total_paid: number; total_unpaid: number }
  >();
  sums.forEach((item: any) => {
    sumsMap.set(item.debt_id, {
      total_paid: Number(item.total_paid) || 0,
      total_unpaid: Number(item.total_unpaid) || 0,
    });
  });

  let debtsTotal = 0;
  let debtsTotalPaid = 0;
  let debtsTotalUnpaid = 0;

  const formattedDebts = await Promise.all(
    debts.map(async debt => {
      const installments = await Installment.findAll({
        where: { debt_id: debt.debt_id },
        attributes: ["installment_id", "amount", "due_date", "status"],
        order: [
          ["due_date", "ASC"],
          ["installment_id", "DESC"],
        ],
      });

      const { total_paid = 0, total_unpaid = 0 } =
        sumsMap.get(debt.debt_id) || {};

      debtsTotal += total_paid + total_unpaid;
      debtsTotalPaid += total_paid;
      debtsTotalUnpaid += total_unpaid;

      return {
        name: debt.name,
        total: total_paid + total_unpaid,
        total_paid,
        total_interest: debt.total_interest,
        interest_per_installment: debt.interest_per_installment,
        total_unpaid,
        debt_id: debt.debt_id,
        notes: debt.notes,
        installments,
      };
    })
  );

  return res.status(200).json({
    debts: formattedDebts,
    debtsTotal,
    debtsTotalPaid,
    debtsTotalUnpaid,
  });
};

export const getDebtsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const debt = await Debt.findByPk(id, {
    raw: true,
    attributes: { exclude: ["user_id", "createdAt", "updatedAt"] },
  });

  if (!debt) return res.status(404).json({ error: "Gasto no encontrado" });
  const installments = await Installment.findAll({
    where: { debt_id: debt.debt_id },
    attributes: ["installment_id", "amount", "due_date", "status"],
    order: [["due_date", "ASC"]],
  });

  return res.status(200).json({
    ...debt,
    installments: installments || [],
  });
};
