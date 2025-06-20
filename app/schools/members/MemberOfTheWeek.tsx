import { User, BookOpen, CheckCircle, AlertTriangle } from "lucide-react";

const memberOfTheWeek = {
  name: "IRAGUHA Patrick",
  email: "iraguha@gmail.com",
  phone: "+1 234 567 890",
  booksBorrowed: 5,
  booksReturned: 3,
  outstandingFines: "RWF 1,500",
};

const MemberOfTheWeek = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 mt-6">
        {/* Title */}
        <h1 className="library-subtitle">
          Member of the Week
        </h1>

        {/* Card */}
        <div className="flex items-center p-5 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 sm:col-span-3 w-full">
          {/* Icon */}
          <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-full">
            <User className="w-12 h-12 text-primary" />
          </div>

          {/* Member Details */}
          <div className="flex-1 ml-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {memberOfTheWeek.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{memberOfTheWeek.email}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{memberOfTheWeek.phone}</p>

            {/* Additional Stats */}
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span>Borrowed: {memberOfTheWeek.booksBorrowed}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Returned: {memberOfTheWeek.booksReturned}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span>Fines: {memberOfTheWeek.outstandingFines}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-6 border-t border-gray-300 dark:border-gray-700" />
    </>
  );
};

export default MemberOfTheWeek;
