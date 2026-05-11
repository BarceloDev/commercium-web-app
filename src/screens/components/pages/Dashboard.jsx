import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [sales, setSales] = useState([]);
  const [timeframe, setTimeframe] = useState("weekly");

  useEffect(() => {
    async function dashboardGet() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/dashboard?period=${timeframe}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        setSales(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    dashboardGet();
  }, [timeframe]);

  const COLORS = [
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // violet
    "#06b6d4", // cyan

    "#ec4899", // pink
    "#84cc16", // lime
    "#f97316", // orange
    "#14b8a6", // teal
    "#a855f7", // purple
    "#eab308", // yellow
  ];

  const totalSales = sales.reduce((acc, item) => acc + item.total, 0);

  const averageSales =
    sales.length > 0 ? (totalSales / sales.length).toFixed(2) : 0;

  const bestSale = sales.reduce(
    (max, item) => (item.total > max.total ? item : max),
    sales[0] || {},
  );

  return (
    <div className="w-screen min-h-screen p-6 flex flex-col gap-6">
      <h1 className="font-bold text-2xl md:text-4xl text-center">
        Welcome, <span className="text-blue-500">{user.user_name}</span>!
      </h1>

      <p className="font-semibold text-center md:text-2xl">
        See how your sales are going.
      </p>

      <select
        value={timeframe}
        onChange={(e) => setTimeframe(e.target.value)}
        className="border rounded p-2 md:self-start md:w-50"
      >
        <option value="weekly">Weekly</option>

        <option value="monthly">Monthly</option>

        <option value="yearly">Yearly</option>
      </select>

      <p className="text-gray-700">
        Your best result was during{" "}
        <span className="font-bold text-blue-500">{bestSale?.label}</span>,
        generating <span className="font-bold">${bestSale?.total || 0}</span>.
      </p>

      <div className="flex flex-col justify-center items-center gap-6">
        <div className="w-full overflow-x-auto flex flex-col md:flex-row justify-around">
          <BarChart width={1200} height={400} data={sales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total">
              {sales.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="w-screen flex flex-col items-center gap-2">
          <div className="flex flex-col gap-2 px-6">
            <h2 className="text-2xl font-bold">Sales Distribution</h2>
            <p className="text-gray-600">
              This chart shows how your sales are distributed throughout the
              selected period.
            </p>
          </div>
          <ResponsiveContainer width="100%" height={600}>
            <PieChart>
              <Pie
                data={sales}
                dataKey="total"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#3b82f6"
                label
              >
                {sales.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full overflow-x-auto flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Sales Trend</h2>

          <p className="text-gray-600">
            Track how your revenue changes over time.
          </p>
          <LineChart width={1500} height={400} data={sales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-4 border-l-8 border-blue-500">
          <h2 className="text-gray-500 font-medium">Total Sales</h2>

          <p className="text-3xl font-bold text-blue-500">${totalSales}</p>
        </div>

        <div className="bg-white shadow rounded p-4 border-l-8 border-green-500">
          <h2 className="text-gray-500 font-medium">Average</h2>

          <p className="text-3xl font-bold text-green-500">${averageSales}</p>
        </div>

        <div className="bg-white shadow rounded p-4 border-l-8 border-purple-500">
          <h2 className="text-gray-500 font-medium">Best Performance</h2>

          <p className="text-xl font-bold text-purple-500">{bestSale?.label}</p>

          <p className="text-gray-600">${bestSale?.total || 0}</p>
        </div>
      </div>
    </div>
  );
}
