import { BookOpen, Clock, RefreshCcw, Users } from "lucide-react";
import { getApiClient } from "../axios";

const Overview = async () => {
  const api = await getApiClient();
  const { data: schoolStats } = await api.get("/librarians/overview");
  const stats = [
    {
      title: "Total Books",
      value: schoolStats?.totalBooks ?? 0,
      icon: <BookOpen className="text-blue-500" />,
    },
    {
      title: "Total Students",
      value: schoolStats?.totalStudents ?? 0,
      icon: <Users className="text-green-500" />,
    },
    {
      title: "Book Copies Circulated",
      value: schoolStats?.booksCirculated ?? 0,
      icon: <RefreshCcw className="text-yellow-500" />,
    },
    {
      title: "Overdue Book Copies",
      value: schoolStats?.overdueBooks ?? 0,
      icon: <Clock className="text-red-500" />,
    },
    // {
    //   title: "Inter-Library Requests",
    //   value: schoolStats?.interLibraryRequests ?? 0,
    //   icon: <Library className="text-purple-500" />,
    // },
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

export default Overview;
