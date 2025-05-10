import { Request, Response } from "express";
import { Op } from "sequelize";
import { models } from "@lib";
import { calculateTotals, endOfMonth, startOfMonth } from "@utils";

const { User, Expense, PaymentMethod, FinancialAccount } = models;

export const getExpenses = async (req: Request, res: Response) => {
  const userId = req.user;

  const user = await User.findByPk(userId);
  const userExpenses = user
    ? await user.getUserExpenses({ order: [["createdAt", "DESC"]] })
    : [];

  const formattedExpenses = await Promise.all(
    userExpenses.map(async (expense) => {
      const expenseDetails = await Expense.findByPk(expense.expense_id, {
        attributes: ["description", "expense_id", "name"],
      });

      const [monthlyMovements, allMovements] = await Promise.all([
        expenseDetails?.getExpenseMovements({
          where: { entry_date: { [Op.between]: [startOfMonth, endOfMonth] } },
        }) || [],
        expenseDetails?.getExpenseMovements() || [],
      ]);

      const totalsForMonth = calculateTotals(monthlyMovements);
      const totalsForAllTime = calculateTotals(allMovements);

      return {
        expense_id: expense.expense_id,
        name: expense.name,
        description: expense.description,
        money_outflow_month: totalsForMonth.money_outflow || 0,
        count_movements_month: totalsForMonth.count_movements || 0,
        money_outflow: totalsForAllTime.money_outflow || 0,
        count_movements: totalsForAllTime.count_movements || 0,
      };
    }),
  );

  return res.status(200).json(formattedExpenses);
};

export const getExpenseById = async (req: Request, res: Response) => {
  const { expense_id } = req.params;
  const expenseSelected = await Expense.findByPk(expense_id);
  if (!expenseSelected)
    return res.status(404).json({ error: "Gasto no encontrado" });

  const movements =
    (await expenseSelected?.getExpenseMovements({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["user_id", ""] },
    })) || [];

  const mappedMovements = await Promise.all(
    movements.map(async (movement) => {
      const [paymentMethodRecord, financialAccountRecord] = await Promise.all([
        PaymentMethod.findByPk(movement.payment_method_id),
        FinancialAccount.findByPk(movement.financial_accounts_id),
      ]);

      return {
        label: movement.label,
        value: movement.value,
        type: movement.type,
        payment_method: paymentMethodRecord?.name || "Sin método de pago",
        account: financialAccountRecord?.name || "Sin cuenta",
        id: movement.movements_id,
        entry_date: movement.entry_date,
      };
    }),
  );

  return res.status(200).json({
    expense_id: expenseSelected.expense_id,
    description: expenseSelected.description,
    name: expenseSelected.name,
    movements: mappedMovements,
  });
};
