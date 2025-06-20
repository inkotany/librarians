"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@radix-ui/themes";
import { fetchBooks } from "./actions";

const BooksTable = () => {
  const { data: books, isLoading, isError, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Spinner size="3" className="text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        {JSON.stringify(error.message)}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-xl border-gray-400">
      <table className="w-full border-collapse text-sm rounded-lg border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="p-4 text-left rounded-tl-lg border-b border-gray-300 dark:border-gray-700">Title</th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Author</th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Publisher</th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Date Acquired</th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Total Copies</th>
            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Copies Available</th>
            <th className="p-4 text-left rounded-tr-lg border-b border-gray-300 dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book, index) => (
            <tr key={index} className="table-r hover:bg-primary hover:text-white transition-colors">
              <td className="table-data">{book.title}</td>
              <td className="table-data">{book.author}</td>
              <td className="table-data">{book.publisher}</td>
              <td className="table-data">{new Date(book.dateAquired).toLocaleDateString()}</td>
              <td className="table-data">{book.totalCopies}</td>
              <td className="table-data">{book.availableCopies}</td>
              <td className="table-data">
                <button className="text-blue-500 hover:underline">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
