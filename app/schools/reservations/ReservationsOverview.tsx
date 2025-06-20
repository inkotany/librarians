import { Calendar, CheckCircle, XCircle, Hourglass, FileText } from "lucide-react";

const reservationsStats = {
  totalReservations: "1,500",  // Total reservations
  activeReservations: "1,200",  // Active reservations
  cancelledReservations: "100",  // Cancelled reservations
  completedReservations: "150",  // Completed reservations
  pendingReservations: "50",  // Pending reservations
};

const stats = [
  {
    title: "Total Reservations",
    value: reservationsStats.totalReservations,
    icon: <Calendar className="text-blue-500" />,
  },
  {
    title: "Active Reservations",
    value: reservationsStats.activeReservations,
    icon: <Hourglass className="text-yellow-500" />,
  },
  {
    title: "Cancelled Reservations",
    value: reservationsStats.cancelledReservations,
    icon: <XCircle className="text-red-500" />,
  },
  {
    title: "Completed Reservations",
    value: reservationsStats.completedReservations,
    icon: <CheckCircle className="text-green-500" />,
  },
  {
    title: "Pending Reservations",
    value: reservationsStats.pendingReservations,
    icon: <FileText className="text-gray-500" />,
  },
];

const ReservationsOverview = () => {
  return (
    <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

export default ReservationsOverview;
