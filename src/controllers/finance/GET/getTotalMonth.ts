import { Request, Response } from "express";
import { models } from "@lib";
import { Op } from "sequelize";
import { calculateTotals, endOfMonth, startOfMonth } from "@utils";

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
  });

  if (!movementsAll) return new Error("No hay movimientos");

  const totalsByType = calculateTotals(movementsAll);

  return res.status(200).json(totalsByType);
};
