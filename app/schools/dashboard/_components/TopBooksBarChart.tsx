"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Types for analytics API response
export interface TopBookData {
  bookTitle: string;
  borrowedCount: number;
}

export interface BorrowingTrendData {
  month: string;
  borrowedBooks: number;
}

export interface AnalyticsResponse {
  topBooksData: TopBookData[];
  borrowingTrendsData: BorrowingTrendData[];
}

interface TopBooksBarChartProps {
  data: TopBookData[];
}

const TopBooksBarChart: React.FC<TopBooksBarChartProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-xl font-normal text-gray-800 dark:text-white mb-4">
        Top Borrowed Books
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bookTitle " />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="borrowedCount" fill="#3674b5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopBooksBarChart;
