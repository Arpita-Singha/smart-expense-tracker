import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

export const getDashboard = async (req, res) => {
  try {
    // Get user data
    const incomes = await Income.find({ user: req.user.id });

    const expenses = await Expense.find({ user: req.user.id });

    // Calculate totals
    const totalIncome = incomes.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const totalExpenses = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const currentBalance = totalIncome - totalExpenses;

    // Recent Transactions
    const recentIncome = await Income.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentExpenses = await Expense.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      summary: {
        totalIncome,
        totalExpenses,
        currentBalance,
      },

      recentIncome,

      recentExpenses,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};