import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

function Expenses() {
  const [expenses, setExpenses] = useState([]);

  const [form, setForm] = useState({
    amount: "",
    category: "Food",
    description: "",
    paymentMethod: "UPI",
  });

  const [search, setSearch] = useState("");

  const fetchExpenses = async () => {
    try {
      const res = await api.get("/expenses");
      setExpenses(res.data.expenses);
    } catch (error) {
      toast.error("Failed to load expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addExpense = async (e) => {
    e.preventDefault();

    try {
      await api.post("/expenses", form);

      toast.success("Expense Added");

      setForm({
        amount: "",
        category: "Food",
        description: "",
        paymentMethod: "UPI",
      });

      fetchExpenses();

    } catch (error) {
      toast.error("Unable to add expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);

      toast.success("Expense Deleted");

      fetchExpenses();

    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Expense Management
      </h1>

      <p className="text-gray-500 mt-2">

        Track and manage your daily expenses.

    </p>

      <form
        onSubmit={addExpense}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <input
            type="text"
            placeholder="Search expense..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="border p-3 rounded w-full mb-5"
        />

        <input
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option>Food</option>
          <option>Shopping</option>
          <option>Fuel</option>
          <option>Travel</option>
          <option>Medical</option>
        </select>

        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option>UPI</option>
          <option>Cash</option>
          <option>Card</option>
          <option>Bank Transfer</option>
        </select>

        <button
          className="bg-blue-600 text-white p-3 rounded col-span-2"
        >
          Add Expense
        </button>

      </form>

<div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

    <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
            Expense History
        </h2>

        <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
            {expenses.length} Records
        </span>

    </div>

    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200">

          <tr className="border-b hover:bg-slate-50 transition duration-200">

            <th className="p-3">Amount</th>

            <th className="px-6 py-4 text-left font-semibold text-gray-700">
    Category
</th>

            <th className="px-6 py-4 text-left font-semibold text-gray-700">
    Description
</th>

            <th className="px-6 py-4 text-left font-semibold text-gray-700">
    Action
</th>

          </tr>

        </thead>

        <tbody>

          {expenses
            .filter((expense)=>
                expense.category.toLowerCase().includes(search.toLowerCase()) ||
                expense.description.toLowerCase().includes(search.toLowerCase())
            )
            .map((expense) => (

            <tr
              key={expense._id}
              className="border-b"
            >

              <td className="p-3">
                ₹{expense.amount}
              </td>

              <td>{expense.category}</td>

              <td>{expense.description}</td>

              <td>

                <button
                  onClick={() => deleteExpense(expense._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
</div>
    </div>
  );
}

export default Expenses;