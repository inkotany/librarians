import { Printer } from "lucide-react";
import React from "react";

const GenerateReport = () => {
  return (
    <div>
      <div className="flex gap-6 max-md:flex-col max-md:gap-4 items-center justify-center py-10">
        {/* Card 1 - From Date Picker */}
        <div className="w-full max-w-[330px] px-6 py-7 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800">
          <form>
            <label htmlFor="from-date" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              From
            </label>
            <div className="flex items-center gap-2 mt-2 border-primary border rounded-md dark:border-primary">
              <input
                type="date"
                id="from-date"
                className="px-4 py-2 w-full rounded-lg border-primary dark:border-primary dark:bg-white dark:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </form>
        </div>

        {/* Card 2 - To Date Picker */}
        <div className="w-full max-w-[330px] px-6 py-7 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800">
          <form>
            <label htmlFor="to-date" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              To
            </label>
            <div className="flex items-center gap-2 mt-2 border-primary border rounded-md">
              <input
                type="date"
                id="to-date"
                className="px-4 py-2 w-full rounded-lg dark:border-primary dark:bg-white dark:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </form>
        </div>

        {/* Card 3 - Type Select */}
        <div className="w-full max-w-[330px] px-6 py-7 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800">
          <form>
            <label htmlFor="type" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              Type
            </label>
            <div className="mt-2 border-primary border rounded-md dark:border-primary">
              <select
                id="type"
                className="px-4 py-2 w-full rounded-lg dark:bg-white dark:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Select Type</option>
                <option value="option1">Full report</option>
                <option value="option2">Students</option>
                <option value="option3">Inter library</option>
                <option value="option4">Circulation</option>
                <option value="option5">Reservations</option>
                <option value="option6">Acquisitions</option>
                <option value="option7">Members</option>
                <option value="option8">Books</option>
              </select>
            </div>
          </form>
        </div>
      </div>
      <div className=" flex items-center justify-center">
        <button
          className="flex items-center px-12 py-2 rounded-lg bg-primary text-white shadow-md transition-all duration-300 ease-in-out hover:bg-primary/80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <Printer className="stroke-1" />
          <span className="ml-2">Generate report</span>
        </button>
      </div>
    </div>
  );
};

export default GenerateReport;
