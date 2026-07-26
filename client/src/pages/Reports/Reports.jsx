import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Reports() {

    const [period, setPeriod] = useState("today");

    const [report, setReport] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        transactions: 0,
        expenses: [],
        income: []
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchReport();
    }, [period]);

    const fetchReport = async () => {

        try {

            const res = await axios.get(
                `${API}/api/reports/${period}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setReport(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-8">

                    <h1 className="text-4xl font-bold mb-6">
                        Financial Reports
                    </h1>

                    <div className="flex gap-4 mb-8">

                        <button
                            onClick={() => setPeriod("today")}
                            className={`px-5 py-2 rounded-lg ${
                                period === "today"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            Today
                        </button>

                        <button
                            onClick={() => setPeriod("month")}
                            className={`px-5 py-2 rounded-lg ${
                                period === "month"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            This Month
                        </button>

                        <button
                            onClick={() => setPeriod("year")}
                            className={`px-5 py-2 rounded-lg ${
                                period === "year"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            This Year
                        </button>

                    </div>

                    <div className="grid lg:grid-cols-4 gap-6">

                        <div className="bg-green-500 text-white rounded-xl p-6">
                            <h3>Income</h3>
                            <h1 className="text-3xl font-bold">
                                ₹{report.totalIncome}
                            </h1>
                        </div>

                        <div className="bg-red-500 text-white rounded-xl p-6">
                            <h3>Expense</h3>
                            <h1 className="text-3xl font-bold">
                                ₹{report.totalExpense}
                            </h1>
                        </div>

                        <div className="bg-blue-500 text-white rounded-xl p-6">
                            <h3>Balance</h3>
                            <h1 className="text-3xl font-bold">
                                ₹{report.balance}
                            </h1>
                        </div>

                        <div className="bg-purple-500 text-white rounded-xl p-6">
                            <h3>Transactions</h3>
                            <h1 className="text-3xl font-bold">
                                {report.transactions}
                            </h1>
                        </div>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg mt-8 p-6">

                        <h2 className="text-2xl font-bold mb-4">
                            Expenses
                        </h2>

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left py-3">Category</th>

                                    <th>Amount</th>

                                    <th>Date</th>

                                </tr>

                            </thead>

                            <tbody>

                                {report.expenses.map((expense) => (

                                    <tr
                                        key={expense._id}
                                        className="border-b"
                                    >

                                        <td className="py-3">
                                            {expense.category}
                                        </td>

                                        <td className="text-red-500">
                                            ₹{expense.amount}
                                        </td>

                                        <td>
                                            {new Date(expense.date).toLocaleDateString()}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Reports;