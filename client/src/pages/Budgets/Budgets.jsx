import { useEffect, useState } from "react";
import axios from "axios";

function Budgets() {

    const [budget, setBudget] = useState(50000);
    const [expenses, setExpenses] = useState([]);
    const [goalName, setGoalName] = useState("Buy Laptop");
    const [target, setTarget] = useState(100000);
    const [saved, setSaved] = useState(35000);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExpenses();
        fetchBudget();
    }, []);

    const fetchExpenses = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/expenses",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setExpenses(res.data.expenses);

        } catch (err) {
            console.log(err);
        }

    };

    const fetchBudget = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
            "http://localhost:5000/api/budgets",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = res.data.budget;

        setBudget(data.monthlyBudget);
        setGoalName(data.savingsGoalName);
        setTarget(data.targetAmount);
        setSaved(data.savedAmount);

    } catch (err) {
        console.log(err);
    } finally {
        setLoading(false);
    }
};

const saveBudget = async () => {
    try {
        const token = localStorage.getItem("token");

        await axios.put(
            "http://localhost:5000/api/budgets",
            {
                monthlyBudget: budget,
                savingsGoalName: goalName,
                targetAmount: target,
                savedAmount: saved
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Budget Saved Successfully!");

    } catch (err) {
        console.log(err);
        alert("Failed to save budget");
    }
};

    const totalExpense = expenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );

    const remaining = budget - totalExpense;

    const budgetPercent =
        budget > 0
            ? (totalExpense / budget) * 100
            : 0;

    const savingPercent =
        target > 0
            ? (saved / target) * 100
            : 0;

    return (

            <div className="p-8">

            <h1 className="text-4xl font-bold mb-8">
                Budget & Savings Goals
            </h1>

            <div className="grid grid-cols-3 gap-6 mb-10">

                <div className="bg-blue-500 text-white rounded-xl p-6 shadow">

                    <h2 className="text-xl">Monthly Budget</h2>

                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="mt-3 w-full p-3 rounded-lg text-black border"
                    />

                </div>

                <div className="bg-red-500 text-white rounded-xl p-6 shadow">

                    <h2 className="text-xl">Spent</h2>

                    <p className="text-3xl font-bold mt-3">
                        ₹{totalExpense}
                    </p>

                </div>

                <div className="bg-green-500 text-white rounded-xl p-6 shadow">

                    <h2 className="text-xl">Remaining</h2>

                    <p className="text-3xl font-bold mt-3">
                        ₹{remaining}
                    </p>

                </div>

            </div>

            <div className="bg-white rounded-xl shadow p-6 mb-10">

                <h2 className="text-2xl font-semibold mb-3">

                    Budget Usage

                </h2>

                <div className="w-full bg-gray-300 rounded-full h-5">

                    <div
                        className={`h-5 rounded-full ${
                            budgetPercent > 100
                                ? "bg-red-500"
                                : "bg-blue-600"
                        }`}
                        style={{
                            width: `${Math.min(
                                budgetPercent,
                                100
                            )}%`,
                        }}
                    ></div>

                </div>

                <p className="mt-3">

                    {budgetPercent.toFixed(1)}% Used

                </p>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

    {/* Budget Settings */}
    <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-blue-600 mb-6">
             Budget Settings
        </h2>

        <label className="block mb-2 font-semibold">
            Monthly Budget
        </label>

        <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full border rounded-lg p-3 mb-5"
        />

        <div className="mb-3">

            <div className="flex justify-between mb-2">

                <span>Budget Used</span>

                <span>{budgetPercent.toFixed(1)}%</span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">

                <div
                    className={`h-4 rounded-full ${
                        budgetPercent > 100
                            ? "bg-red-500"
                            : "bg-blue-600"
                    }`}
                    style={{
                        width: `${Math.min(budgetPercent,100)}%`
                    }}
                ></div>

            </div>

        </div>

        {
            budgetPercent > 100 && (

                <div className="mt-5 bg-red-100 text-red-700 p-3 rounded-lg">

                    ⚠ Budget Exceeded!

                </div>

            )
        }

    </div>

    {/* Savings Goal */}

    <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-green-600 mb-6">

            Savings Goal

        </h2>

        <label className="block mb-2 font-semibold">

            Goal Name

        </label>

        <input
            className="w-full border rounded-lg p-3 mb-5"
            value={goalName}
            onChange={(e)=>setGoalName(e.target.value)}
        />

        <label className="block mb-2 font-semibold">

            Target Amount

        </label>

        <input
            type="number"
            className="w-full border rounded-lg p-3 mb-5"
            value={target}
            onChange={(e)=>setTarget(Number(e.target.value))}
        />

        <label className="block mb-2 font-semibold">

            Saved Amount

        </label>

        <input
            type="number"
            className="w-full border rounded-lg p-3 mb-5"
            value={saved}
            onChange={(e)=>setSaved(Number(e.target.value))}
        />

        <div className="mb-4">

            <div className="flex justify-between mb-2">

                <span>Progress</span>

                <span>{savingPercent.toFixed(1)}%</span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">

                <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{
                        width:`${Math.min(savingPercent,100)}%`
                    }}
                ></div>

            </div>

        </div>

        <div className="bg-green-50 rounded-lg p-4 mb-5">

            <p><strong>Remaining:</strong> ₹{target-saved}</p>

        </div>

        <button
            onClick={saveBudget}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
            Save Budget
        </button>

    </div>

</div>
</div>
    );

}

export default Budgets;