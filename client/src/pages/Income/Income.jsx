import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

function Income() {
  const [income, setIncome] = useState([]);

  const [form, setForm] = useState({
    amount: "",
    source: "",
    category: "Salary",
    notes: "",
    paymentMethod: "Bank Transfer",
  });

  const fetchIncome = async () => {
    try {
      const res = await api.get("/income");
      setIncome(res.data.income);
    } catch (error) {
      toast.error("Failed to load income");
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addIncome = async (e) => {
    e.preventDefault();

    try {
      await api.post("/income", form);

      toast.success("Income Added");

      setForm({
        amount: "",
        source: "",
        category: "Salary",
        notes: "",
        paymentMethod: "Bank Transfer",
      });

      fetchIncome();
    } catch (error) {
      toast.error("Unable to add income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await api.delete(`/income/${id}`);

      toast.success("Income Deleted");

      fetchIncome();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Income Management
      </h1>

      <form
        onSubmit={addIncome}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="source"
          placeholder="Income Source"
          value={form.source}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option>Salary</option>
          <option>Freelancing</option>
          <option>Business</option>
          <option>Investment</option>
          <option>Bonus</option>
          <option>Rental Income</option>
          <option>Gifts</option>
          <option>Others</option>
        </select>

        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option>Bank Transfer</option>
          <option>UPI</option>
          <option>Cash</option>
          <option>Card</option>
        </select>

        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="border p-3 rounded col-span-2"
        />

        <button
          className="bg-green-600 text-white p-3 rounded col-span-2 hover:bg-green-700"
        >
          Add Income
        </button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Amount</th>
            <th>Source</th>
            <th>Category</th>
            <th>Payment</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {income.length > 0 ? (
            income.map((item) => (
              <tr key={item._id} className="border-b text-center">
                <td className="p-3">₹{item.amount}</td>
                <td>{item.source}</td>
                <td>{item.category}</td>
                <td>{item.paymentMethod}</td>
                <td>{item.notes}</td>
                <td>
                  <button
                    onClick={() => deleteIncome(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-5 text-gray-500">
                No income records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Income;