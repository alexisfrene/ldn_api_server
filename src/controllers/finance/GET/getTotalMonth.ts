import { Request, Response } from "express";
import { models } from "@lib";
import { Op, Sequelize } from "sequelize";
import { endOfMonth, startOfMonth } from "@utils";

const { Movement } = models;

export const getTotalMonth = async (req: Request, res: Response) => {
  const user_id = req.user;

  const movementsAll = await Movement.findAll({
    where: {
      entry_date: {
        [Op.between]: [startOfMonth, endOfMonth],
      },
      user_id,
    },
    attributes: ["type", "value"],
  });

  if (!movementsAll) return new Error("No hay movimientos");

  const totals: any = await Movement.findAll({
    where: {
      user_id,
      entry_date: {
        [Op.between]: [startOfMonth, endOfMonth],
      },
    },
    attributes: [
      "type",
      [Sequelize.fn("SUM", Sequelize.col("value")), "total"],
      [Sequelize.fn("COUNT", Sequelize.col("movements_id")), "count"],
    ],
    group: ["type"],
    raw: true,
  });
  const count_movements = await Movement.count({
    where: {
      user_id,
      entry_date: {
        [Op.between]: [startOfMonth, endOfMonth],
      },
    },
  });

  return res.status(200).json({
    count_movements,
    [totals[0].type]: totals[0].total,
    [totals[1].type]: totals[1].total,
    different: totals[0].total - totals[1].total,
  });
};
