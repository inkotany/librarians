import React from "react"; import Pagination from "../books/Pagination";
;

const reports = [
    {
        librarianName: "John Doe",
        reportType: "Full Report",
        timeCreated: "2025-04-01 10:30 AM",
        fromDate: "2025-03-30",
        toDate: "2025-04-01",
    },
    {
        librarianName: "Jane Smith",
        reportType: "Students",
        timeCreated: "2025-04-02 2:00 PM",
        fromDate: "2025-03-01",
        toDate: "2025-03-31",
    },
    {
        librarianName: "Mark Johnson",
        reportType: "Inter library",
        timeCreated: "2025-04-03 9:15 AM",
        fromDate: "2025-04-01",
        toDate: "2025-04-03",
    },
    {
        librarianName: "Alice Brown",
        reportType: "Circulation",
        timeCreated: "2025-04-04 11:00 AM",
        fromDate: "2025-03-25",
        toDate: "2025-03-31",
    },
    {
        librarianName: "Emily White",
        reportType: "Reservations",
        timeCreated: "2025-04-05 1:45 PM",
        fromDate: "2025-03-01",
        toDate: "2025-03-31",
    },
    {
        librarianName: "David Green",
        reportType: "Acquisitions",
        timeCreated: "2025-04-06 3:30 PM",
        fromDate: "2025-04-01",
        toDate: "2025-04-05",
    },
    {
        librarianName: "Sophia Clark",
        reportType: "Full Report",
        timeCreated: "2025-04-07 10:00 AM",
        fromDate: "2025-03-01",
        toDate: "2025-03-31",
    },
    {
        librarianName: "Lucas Scott",
        reportType: "Members",
        timeCreated: "2025-04-08 4:20 PM",
        fromDate: "2025-02-01",
        toDate: "2025-02-28",
    },
];

const ReportsTable = () => {
    return (
        <>
            <h2 className="library-subtitle my-4">Recent reports</h2>
            <div className="overflow-x-auto border rounded-xl border-gray-400">
                <table className="w-full border-collapse text-sm rounded-lg border-gray-300 dark:border-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="p-4 text-left rounded-tl-lg border-b border-gray-300 dark:border-gray-700">Librarian Name</th>
                            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Report Type</th>
                            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Time Created</th>
                            <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Time Frame (From - To)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={index} className="table-r dark:hover:bg-gray-700 transition-colors">
                                <td className="table-data">{report.librarianName}</td>
                                <td className="table-data">{report.reportType}</td>
                                <td className="table-data">{report.timeCreated}</td>
                                <td className="table-data">{report.fromDate} - {report.toDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination />
        </>
    );
};

export default ReportsTable;
