import {
  FaChartPie,
  FaMoneyBillWave,
  FaWallet,
  FaChartLine,
  FaBullseye,
  FaUser,
  FaFileAlt,
  FaCog
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: <FaChartPie />, path: "/dashboard" },
    { name: "Expenses", icon: <FaMoneyBillWave />, path: "/expenses" },
    { name: "Income", icon: <FaWallet />, path: "/income" },
    { name: "Analytics", icon: <FaChartLine />, path: "/analytics" },
    { name: "Budget", icon: <FaBullseye />, path: "/budgets" },
    { name: "Reports", icon: <FaFileAlt />, path: "/reports" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (

    <div className="w-64 bg-slate-900 text-white min-h-screen shadow-xl">

      <div className="text-center py-8">

        <h1 className="text-2xl font-bold">
           Smart Expense Tracker
        </h1>

      </div>

      <nav className="px-4">

        {menu.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition-all ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`}
          >
            {item.icon}

            {item.name}

          </Link>

        ))}

      </nav>

    </div>

  );

}

export default Sidebar;