import { Request, Response } from "express";
import { db } from "../../../lib";
import { Op } from "sequelize";

const movements = db.Movements;
interface Movement {
  type: string;
  value: number;
}

interface TotalsByType {
  [key: string]: number;
}
export const getTotalMonth = async (req: Request, res: Response) => {
  const user_id = req.user;
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const endOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  const movementsAll: Movement[] = await movements.findAll({
    where: {
      createdAt: {
        [Op.between]: [startOfMonth, endOfMonth],
      },
      user_id,
    },
  });

  if (!movementsAll) return new Error("No hay movimientos");

  const totalsByType = movementsAll.reduce<TotalsByType>(
    (acc: TotalsByType, item: Movement) => {
      const type = item.type;
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] += item.value;

      return acc;
    },
    { count_movements: movementsAll.length }
  );

  return res.status(200).json(totalsByType);
};
