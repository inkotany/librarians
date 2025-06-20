import { Hand, ArrowRight, RefreshCw } from "lucide-react";
import Pagination from "../books/Pagination";

const interLibraryRequests = [
  {
    lenderInstitution: "University A",
    borrowerInstitution: "Library B",
    numberOfCopies: 3,
    bookTitle: "The Great Gatsby",
    requestDays: "5 days",
    reason: "",
  },
  {
    lenderInstitution: "Library C",
    borrowerInstitution: "University B",
    numberOfCopies: 2,
    bookTitle: "1984",
    requestDays: "10 days",
    reason: "Out of stock",
  },
  {
    lenderInstitution: "Library D",
    borrowerInstitution: "University C",
    numberOfCopies: 4,
    bookTitle: "To Kill a Mockingbird",
    requestDays: "3 days",
    reason: "",
  },
];

const InterLibraryTable = () => {
  return (
    <>
    <h2 className="library-subtitle mt-6 mb-4">Recent Activities</h2>
      <div className="overflow-x-auto border border-px rounded-xl border-gray-400">
        <table className="w-full border-collapse text-sm rounded-lg border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4 text-left rounded-tl-lg border-b border-gray-300 dark:border-gray-700">Lender Institution</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Borrower Institution</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Number of Copies</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Book Title</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Request Days (Time Since Request Was Made)</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Reason (If Rejected)</th>
              <th className="p-4 text-left rounded-tr-lg border-b border-gray-300 dark:border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {interLibraryRequests.map((item, index) => (
              <tr key={index} className="table-r dark:hover:bg-gray-700 transition-colors">
                <td className="table-data">{item.lenderInstitution}</td>
                <td className="table-data">{item.borrowerInstitution}</td>
                <td className="table-data">{item.numberOfCopies}</td>
                <td className="table-data">{item.bookTitle}</td>
                <td className="table-data">{item.requestDays}</td>
                <td className="table-data">{item.reason}</td>
                <td className="table-data">
                  <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                    <Hand className="w-4 h-4" />
                  </button>
                  <button className="ml-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                    <RefreshCw className="w-4 h-4" />
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

export default InterLibraryTable;
