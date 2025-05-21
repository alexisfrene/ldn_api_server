import { Op, Sequelize } from "sequelize";
import { endOfMonth, startOfMonth } from "@utils";
import { models } from "@lib/sequelize";

const { Movement } = models;

type MovementTotal = {
  type: "inflow_of_money" | "money_outflow";
  total: string;
  count: string;
};

export const getTotalMonthService = async (user_id: string) => {
  const dateRange = {
    [Op.between]: [startOfMonth, endOfMonth],
  };

  const totals = (await Movement.findAll({
    where: {
      user_id,
      entry_date: dateRange,
    },
    attributes: [
      "type",
      [Sequelize.fn("SUM", Sequelize.col("value")), "total"],
      [Sequelize.fn("COUNT", Sequelize.col("movements_id")), "count"],
    ],
    group: ["type"],
    raw: true,
  })) as unknown as MovementTotal[];

  const count_movements = await Movement.count({
    where: {
      user_id,
      entry_date: dateRange,
    },
  });

  let inflow_of_money = 0;
  let money_outflow = 0;

  for (const item of totals) {
    const type = item.type;
    const total = Number(item.total) || 0;

    if (type === "inflow_of_money") inflow_of_money = total;
    if (type === "money_outflow") money_outflow = total;
  }

  return {
    status: 200,
    body: {
      count_movements,
      inflow_of_money,
      money_outflow,
      different: inflow_of_money - money_outflow,
    },
  };
};
