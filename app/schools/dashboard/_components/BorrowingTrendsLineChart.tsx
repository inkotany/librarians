"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BorrowingTrendsLineChart = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-xl font-normal text-gray-800 dark:text-white mb-4">
        Monthly Borrowing Trends
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="borrowedBooks" stroke="#3674b5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BorrowingTrendsLineChart;
