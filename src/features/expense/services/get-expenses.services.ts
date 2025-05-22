import { calculateTotals, endOfMonth, startOfMonth } from "@utils";
import { models } from "@lib/sequelize";

const { Expense, Movement } = models;

export const getExpensesService = async (
  userId: string,
  page: number,
  limit: number,
) => {
  const offset = (page - 1) * limit;
  const { count, rows } = (await Expense.findAndCountAll({
    where: { user_id: userId },
    include: [
      {
        model: Movement,
        as: "ExpenseMovements",
      },
    ],
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  })) as { count: number; rows: any[] };

  const formattedExpenses = rows.map((expense) => {
    const allMovementsForExpense = expense.ExpenseMovements || [];
    const movementsForCurrentMonth = allMovementsForExpense.filter(
      (movement) => {
        const createdAt = new Date(movement.createdAt);
        return createdAt >= startOfMonth && createdAt <= endOfMonth;
      },
    );
    const totalsForMonth = calculateTotals(movementsForCurrentMonth);
    const totalsForAllTime = calculateTotals(allMovementsForExpense);

    return {
      expense_id: expense.expense_id,
      name: expense.name,
      description: expense.description,
      money_outflow_month: totalsForMonth.money_outflow || 0,
      count_movements_month: totalsForMonth.count_movements || 0,
      money_outflow: totalsForAllTime.money_outflow || 0,
      count_movements: totalsForAllTime.count_movements || 0,
    };
  });

  return {
    status: 200,
    body: {
      expenses: formattedExpenses,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalItems: count,
      limit,
    },
  };
};

export const getExpenseByIdService = async (expense_id: string) => {
  const { Expense, PaymentMethod, FinancialAccount } = models;
  const expenseSelected = await Expense.findByPk(expense_id);
  if (!expenseSelected)
    return { status: 404, body: { error: "Gasto no encontrado" } };

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

  return {
    status: 200,
    body: {
      expense_id: expenseSelected.expense_id,
      description: expenseSelected.description,
      name: expenseSelected.name,
      movements: mappedMovements,
    },
  };
};
