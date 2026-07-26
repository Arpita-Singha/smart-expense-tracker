import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f97316",
  "#ef4444",
  "#a855f7",
  "#06b6d4",
];

function ExpenseCategoryChart({ expenses }) {
  const categoryMap = {};

  expenses.forEach((item) => {
    categoryMap[item.category] =
      (categoryMap[item.category] || 0) + Number(item.amount);
  });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">
        Expense Categories
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" label>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseCategoryChart;