import { useEffect, useState } from "react";

import api from "../../services/api";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import SummaryCard from "../../components/SummaryCard";
import IncomeExpenseChart from "../../components/IncomeExpenseChart";
import ExpenseCategoryChart from "../../components/ExpenseCategoryChart";

import {
  FaWallet,
  FaArrowCircleDown,
  FaPiggyBank,
  FaBullseye,
} from "react-icons/fa";

function Dashboard() {

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    currentBalance: 0,
  });

  const [expenses, setExpenses] = useState([]);

  const savings = summary.totalIncome - summary.totalExpenses;

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await api.get("/dashboard");
        setSummary(res.data.summary);

        const expenseRes = await api.get("/expenses");
        setExpenses(expenseRes.data.expenses);

      } catch (error) {

        console.log(error);

      }

    };

    fetchDashboard();

  }, []);

  return (

    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        {/* Welcome */}

        <div className="px-8 pt-6">

          <h1 className="text-4xl font-bold text-slate-800">

            Welcome Back, {localStorage.getItem("userName") || "User"}!

          </h1>

          <p className="text-gray-500 mt-2">

            Here's an overview of your financial activity.

          </p>

        </div>

        {/* Summary Cards */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 p-8">

          <SummaryCard
            title="Total Income"
            value={summary.totalIncome}
            icon={<FaWallet />}
            color="text-green-600"
          />

          <SummaryCard
            title="Total Expense"
            value={summary.totalExpenses}
            icon={<FaArrowCircleDown />}
            color="text-red-600"
          />

          <SummaryCard
            title="Current Balance"
            value={summary.currentBalance}
            icon={<FaPiggyBank />}
            color="text-blue-600"
          />

          <SummaryCard
            title="Savings"
            value={savings}
            icon={<FaBullseye />}
            color="text-purple-600"
          />

        </div>

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-6 px-8">

          <IncomeExpenseChart
            income={summary.totalIncome}
            expense={summary.totalExpenses}
          />

          <ExpenseCategoryChart
            expenses={expenses}
          />

        </div>

        {/* Recent Expenses */}

        <div className="p-8">

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-5">

              Recent Expenses

            </h2>

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">Category</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Date</th>

                </tr>

              </thead>

              <tbody>

                {expenses.length > 0 ? (

                  expenses.slice(0, 5).map((expense) => (

                    <tr
                      key={expense._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="py-3">
                        {expense.category}
                      </td>

                      <td className="text-red-500 font-semibold">
                        ₹{expense.amount}
                      </td>

                      <td>
                        {new Date(expense.date).toLocaleDateString()}
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="3"
                      className="text-center py-6 text-gray-500"
                    >
                      No expenses found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;