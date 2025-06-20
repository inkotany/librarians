"use client";
import NitSkeleton from "@/app/_components/Skeleton";
import dynamic from "next/dynamic";

const BorrowingTrendsLineChart = dynamic(
  () => import("./_components/BorrowingTrendsLineChart"),
  {
    ssr: false,
    loading: () => <NitSkeleton />,
  }
);

const TopBooksBarChart = dynamic(
  () => import("./_components/TopBooksBarChart"),
  {
    ssr: false,
    loading: () => <NitSkeleton />,
  }
);

const Analytics = ({ topBooksData, borrowingTrendsData }) => {
  return (
    <>
      <h2 className="library-subtitle mt-6">Analytics</h2>
      <div className="grid grid-cols-2 mt-4 gap-6">
        <TopBooksBarChart data={topBooksData} />
        <BorrowingTrendsLineChart data={borrowingTrendsData} />
      </div>
    </>
  );
};

export default Analytics;
