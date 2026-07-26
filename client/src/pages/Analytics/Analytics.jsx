import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import api from "../../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const incomeRes = await api.get("/api/income", config);

      const expenseRes = await api.get("/api/expenses", config);

      setIncome(incomeRes.data.income || []);
      setExpenses(expenseRes.data.expenses || []);
    } catch (err) {
      console.log(err);
    }
  };

  const totalIncome = income.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const balance = totalIncome - totalExpense;

  const savingsRate =
    totalIncome > 0
      ? ((balance / totalIncome) * 100).toFixed(1)
      : 0;

  const totalTransactions = income.length + expenses.length;

  const averageExpense =
    expenses.length > 0
      ? (totalExpense / expenses.length).toFixed(2)
      : 0;

  const categoryMap = {};

  expenses.forEach((item) => {
    const category = item.category || "Other";

    categoryMap[category] =
      (categoryMap[category] || 0) + Number(item.amount);
  });

  const highestCategory =
    Object.keys(categoryMap).length > 0
      ? Object.keys(categoryMap).reduce((a, b) =>
          categoryMap[a] > categoryMap[b] ? a : b
        )
      : "N/A";

  const pieData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: [
          "#3B82F6",
          "#22C55E",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#EC4899",
          "#14B8A6",
          "#F97316",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ["Income", "Expense", "Balance"],
    datasets: [
      {
        label: "Amount",
        data: [totalIncome, totalExpense, balance],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#3b82f6",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold text-slate-800">
         Financial Analytics
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Track your financial performance and spending insights.
      </p>

      {/* Summary Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">

        <div className="bg-green-500 text-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg"> Total Income</h3>
          <p className="text-3xl font-bold mt-3">
            ₹{totalIncome.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-red-500 text-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg"> Total Expense</h3>
          <p className="text-3xl font-bold mt-3">
            ₹{totalExpense.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-blue-500 text-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg"> Net Savings</h3>
          <p className="text-3xl font-bold mt-3">
            ₹{balance.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-purple-500 text-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg"> Savings Rate</h3>
          <p className="text-3xl font-bold mt-3">
            {savingsRate}%
          </p>
        </div>

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            Income vs Expense
          </h2>

          <Bar data={barData} />

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            Expense Categories
          </h2>

          <Pie data={pieData} />

        </div>

      </div>

      {/* Financial Insights */}

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
             Financial Insights
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Highest Expense Category</span>
              <span className="font-bold">{highestCategory}</span>
            </div>

            <div className="flex justify-between">
              <span>Average Expense</span>
              <span className="font-bold">
                ₹{Number(averageExpense).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Transactions</span>
              <span className="font-bold">
                {totalTransactions}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Budget Status</span>

              <span
                className={`font-bold ${
                  balance >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {balance >= 0
                  ? "Within Budget ✅"
                  : "Overspent ❌"}
              </span>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
             Monthly Summary
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">
              <span>Total Income</span>
              <span className="font-bold text-green-600">
                ₹{totalIncome.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Expense</span>
              <span className="font-bold text-red-600">
                ₹{totalExpense.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Net Savings</span>
              <span className="font-bold text-blue-600">
                ₹{balance.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-green-100 text-green-700 text-center font-semibold">

              {balance > 0
                ? " Great! You are saving money."
                : " Your expenses are higher than your income."}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;