"use client";

import { useStudentsQuery } from "./hooks";
import { Spinner } from "@radix-ui/themes";

const AllStudents = () => {
  const { data, isLoading, error } = useStudentsQuery();
  if (isLoading) return <Spinner />;
  if (error) return <p>Error occured</p>;
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full border-collapse text-sm rounded-lg border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="p-4 text-left rounded-tl-lg border-b border-gray-300 dark:border-gray-700">
              Names
            </th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">
              Parent s Phone Number
            </th>
            <th className="p-4 text-left rounded-tr-lg border-b border-gray-300 dark:border-gray-700">
              Student Card
            </th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">
              Student Code
            </th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">
              Class
            </th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">
              Email
            </th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr
              key={index}
              className="table-r dark:hover:bg-gray-700 transition-colors"
            >
              <td className="table-data">{`${student.firstName} ${student.lastName}`}</td>
              <td className="table-data">{student.parentPhone}</td>
              <td className="table-data">{student.studentCard}</td>
              <td className="table-data">{student.code}</td>
              <td className="table-data">{student.className}</td>
              <td className="table-data">{student.email}</td>
              <td className="table-data">{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudents;
