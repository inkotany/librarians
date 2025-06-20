import { ArrowRight, RefreshCw } from "lucide-react";

type Circulation = {
  borrowerName: string;
  bookTitle: string;
  bookCode: string;
  timeSinceBorrowing: string;
  fines: string;
  status: string;
  dueDate: string;
  comment?: string;
  lendDate: string;
};

type CirculationsTableProps = {
  circulations: Circulation[];
};

const CirculationsTable = ({ circulations }: CirculationsTableProps) => {
  return (
    <>
      <div className="overflow-x-auto border border-px rounded-xl border-gray-400">
        <table className="w-full border-collapse text-sm rounded-lg border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4 text-left rounded-tl-lg border-b border-gray-300 dark:border-gray-700">Borrower Names</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Book Title</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Book Copy Code</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Time Since Borrowed</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Status</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Borrowed Date</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Due Date</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Fines</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Comment</th>
              <th className="p-4 text-left rounded-tr-lg border-b border-gray-300 dark:border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {circulations.map((item, index) => (
              <tr key={index} className="table-r dark:hover:bg-gray-700 transition-colors">
                <td className="table-data">{item.borrowerName}</td>
                <td className="table-data">{item.bookTitle}</td>
                <td className="table-data">{item.bookCode}</td>
                <td className="table-data">{item.timeSinceBorrowing}</td>
                <td className="table-data">{item.status}</td>
                <td className="table-data">{item.lendDate}</td>
                <td className="table-data">{item.dueDate}</td>
                <td className="table-data">{item.fines}</td>
                <td className="table-data">{item.comment}</td>
                <td className="table-data">
                  <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                    <RefreshCw className="w-2 h-2" />
                  </button>
                  <button className="ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                    <ArrowRight className="w-2 h-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CirculationsTable;
