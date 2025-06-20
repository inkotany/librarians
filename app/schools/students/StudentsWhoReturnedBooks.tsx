"use client";

import { Spinner } from "@radix-ui/themes";
import { useStudentsWhoReturnedBooksQuery } from "./hooks";

const StudentsReturnedBooksTable = () => {
  const { data: returnedBooks, isLoading, error } = useStudentsWhoReturnedBooksQuery();
        if (isLoading) return <Spinner />;
        if (error) return <p>Error occured</p>;
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full border-collapse text-sm rounded-lg border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="p-4 text-left rounded-tl-lg border-b border-gray-300 dark:border-gray-700">Names</th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Class</th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Student Code</th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Book Title</th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Book Code</th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Author</th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Publisher</th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Return Date</th>
          </tr>
        </thead>
        <tbody>
          {returnedBooks.map((item, index) => (
            <tr key={index} className="table-r dark:hover:bg-gray-700 transition-colors">
              <td className="table-data">{item.studentName}</td>
              <td className="table-data">{item.studentClass}</td>
              <td className="table-data">{item.studentCode}</td>
              <td className="table-data">{item.bookTitle}</td>
              <td className="table-data">{item.bookCode}</td>
              <td className="table-data">{item.author}</td>
              <td className="table-data">{item.publisher}</td>
              <td className="table-data">{item.returnDate}</td>
 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsReturnedBooksTable;
