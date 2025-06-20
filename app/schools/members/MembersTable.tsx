import { CheckCircle, XCircle } from "lucide-react";
import Pagination from "../books/Pagination";

const members = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    gender: "Male",
    fines: "$10.00",
    dob: "1990-05-15",
    status: "Active",
    profilePic: "https://picsum.photos/id/237/200/300",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "+1 987 654 321",
    gender: "Female",
    fines: "$5.00",
    dob: "1995-09-20",
    status: "Inactive",
    profilePic: "https://picsum.photos/id/237/200/300",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alicej@example.com",
    phone: "+44 123 456 789",
    gender: "Female",
    fines: "$0.00",
    dob: "1988-12-10",
    status: "Active",
    profilePic: "https://picsum.photos/id/237/200/300",
  },
];

const MembersTable = () => {
  return (
    <div className="w-full mt-6 overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            {/* <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Profile</th> */}
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Phone
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Gender
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Fines
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              DOB
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr
              key={member.id}
              className="border-b border-gray-200 dark:border-gray-600"
            >
              {/* <td className="px-4 py-3">
                <img
                  src={member.profilePic}
                  alt={member.name}
                  className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
                />
              </td> */}
              <td className="px-4 py-3 text-gray-900 dark:text-white">
                {member.name}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {member.email}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {member.phone}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {member.gender}
              </td>
              <td className="px-4 py-3 text-red-500 dark:text-red-400 font-semibold">
                {member.fines}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {member.dob}
              </td>
              <td className="px-4 py-3">
                {member.status === "Active" ? (
                  <span className="flex items-center text-green-500 font-semibold">
                    <CheckCircle className="w-4 h-4 mr-1" /> Active
                  </span>
                ) : (
                  <span className="flex items-center text-red-500 font-semibold">
                    <XCircle className="w-4 h-4 mr-1" /> Inactive
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default MembersTable;
