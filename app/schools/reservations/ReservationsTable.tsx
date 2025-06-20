import { CheckCircle, XCircle } from "lucide-react";
import Pagination from "../books/Pagination";

const reservations = [
  {
    name: "John Doe",
    bookTitle: "The Great Gatsby",
    status: "Pending",
  },
  {
    name: "Jane Smith",
    bookTitle: "1984",
    status: "Approved",
  },
  {
    name: "Sam Johnson",
    bookTitle: "To Kill a Mockingbird",
    status: "Rejected",
  },
  {
    name: "Emily Clark",
    bookTitle: "Moby Dick",
    status: "Pending",
  },
];

const ReservationsTable = () => {
  return (
    <>
    <h2 className="library-subtitle mt-6 mb-4">Recent reservations</h2>
      <div className="overflow-x-auto border border-px rounded-xl border-gray-400">
        <table className="w-full border-collapse text-sm rounded-lg border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4 text-left rounded-tl-lg border-b border-gray-300 dark:border-gray-700">Name</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Book Title</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Status</th>
              <th className="p-4 text-left rounded-tr-lg border-b border-gray-300 dark:border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index} className="table-r dark:hover:bg-gray-700 transition-colors">
                <td className="table-data">{reservation.name}</td>
                <td className="table-data">{reservation.bookTitle}</td>
                <td className="table-data">{reservation.status}</td>
                <td className="table-data">
                  <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button className="ml-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                    <XCircle className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </>
  );
};

export default ReservationsTable;
