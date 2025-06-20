const data = [
    { name: "Book 1", author: "Author 1", copies: 10, status: "Available" },
    { name: "Book 2", author: "Author 2", copies: 5, status: "Borrowed" },
    { name: "Book 3", author: "Author 3", copies: 2, status: "Available" },
];

const Table = () => {
    return (
        <div className="overflow-x-auto border rounded-xl border-gray-400">
            <table className="w-full border-collapse text-sm rounded-lg border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <tr>
                        <th className="p-4 text-left rounded-tl-lg border-b border-gray-300 dark:border-gray-700">Book Title</th>
                        <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Author</th>
                        <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Copies</th>
                        <th className="p-4 text-left rounded-tr-lg border-b border-gray-300 dark:border-gray-700">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="table-r dark:hover:bg-gray-700 transition-colors">
                            <td className="table-data">{item.name}</td>
                            <td className="table-data">{item.author}</td>
                            <td className="table-data">{item.copies}</td>
                            <td className="table-data">{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
