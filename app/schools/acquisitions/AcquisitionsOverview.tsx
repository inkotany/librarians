import { BookCopy, CalendarDays } from "lucide-react";
import { getApiClient } from "../axios";

const AcquisitionsOverview = async () => {
  const api = await getApiClient();
  const { data: acquisitionStats } = await api.get("/acquisitions/overview");
  const stats = [
    {
      title: "Total Acquired",
      value: acquisitionStats.totalAcquired,
      icon: <BookCopy className="text-green-500" />,
    },
    // {
    //     title: "Suppliers",
    //     value: acquisitionStats.totalSuppliers,
    //     icon: <Truck className="text-blue-500" />,
    // },
    {
      title: "Acquired This Month",
      value: acquisitionStats.acquiredThisMonth,
      icon: <CalendarDays className="text-yellow-500" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 mt-3 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center p-4 bg-white dark:bg-gray-800 shadow-md rounded-2xl"
        >
          <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full">
            {stat.icon}
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {stat.title}
            </p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AcquisitionsOverview;
