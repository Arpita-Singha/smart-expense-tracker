import Expense from "../models/Expense.js";
import Income from "../models/Income.js";

// =========================
// Today's Report
// =========================
export const getTodayReport = async (req, res) => {
    try {
        const today = new Date();

        const start = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        const end = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
        );

        const expenses = await Expense.find({
            user: req.user.id,
            date: { $gte: start, $lt: end }
        });

        const income = await Income.find({
            user: req.user.id,
            date: { $gte: start, $lt: end }
        });

        const totalIncome = income.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        );

        const totalExpense = expenses.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        );

        res.json({
            success: true,
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
            transactions: expenses.length + income.length,
            expenses,
            income
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// =========================
// Monthly Report
// =========================
export const getMonthReport = async (req, res) => {

    try {

        const today = new Date();

        const start = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const end = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            1
        );

        const expenses = await Expense.find({
            user: req.user.id,
            date: { $gte: start, $lt: end }
        });

        const income = await Income.find({
            user: req.user.id,
            date: { $gte: start, $lt: end }
        });

        const totalIncome = income.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        );

        const totalExpense = expenses.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        );

        res.json({
            success: true,
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
            transactions: expenses.length + income.length,
            expenses,
            income
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// =========================
// Yearly Report
// =========================
export const getYearReport = async (req, res) => {

    try {

        const today = new Date();

        const start = new Date(
            today.getFullYear(),
            0,
            1
        );

        const end = new Date(
            today.getFullYear() + 1,
            0,
            1
        );

        const expenses = await Expense.find({
            user: req.user.id,
            date: { $gte: start, $lt: end }
        });

        const income = await Income.find({
            user: req.user.id,
            date: { $gte: start, $lt: end }
        });

        const totalIncome = income.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        );

        const totalExpense = expenses.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        );

        res.json({
            success: true,
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
            transactions: expenses.length + income.length,
            expenses,
            income
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};