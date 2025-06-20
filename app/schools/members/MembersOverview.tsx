import { Users, UserCheck, UserX, Clock, CreditCard, DollarSign } from "lucide-react";
import { getApiClient } from "../axios";


const MembersOverview = async () => {
  const api = await getApiClient();
  const { data: membersStats } = await api.get('/members/library/overview');
  const stats = [
    {
      title: "Total Members",
      value: membersStats.totalMembers,
      icon: <Users className="text-blue-500" />,
    },
    {
      title: "Active Members",
      value: membersStats.activeMembers,
      icon: <UserCheck className="text-green-500" />,
    },
    {
      title: "Inactive Members",
      value: membersStats.inactiveMembers,
      icon: <UserX className="text-gray-500" />,
    },
    {
      title: "Overdue Members",
      value: membersStats.overdueMembers,
      icon: <Clock className="text-yellow-500" />,
    },
    {
      title: "Members with Fines",
      value: membersStats.membersWithFines,
      icon: <CreditCard className="text-red-500" />,
    },
    {
      title: "Total Fines",
      value: membersStats.totalFines,
      icon: <DollarSign className="text-red-500" />,
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

export default MembersOverview;
