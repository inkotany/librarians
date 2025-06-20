import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
    return (
        <div className="flex justify-start items-center space-x-2 mt-4">
            <button
                className="px-3 py-2 rounded-full border border-gray-300 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                   hover:bg-primary hover:text-white transition-all"
            >
                <ChevronLeft size={18} />
            </button>
            {[1, 2, 3, "...", 10].map((page, index) => (
                <button
                    key={index}
                    className={`px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 
                      ${page === 1 ? "bg-primary text-white shadow-md" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white"} 
                      transition-all`}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                className="px-3 py-2 rounded-full border border-gray-300 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                   hover:bg-primary hover:text-white transition-all"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
};

export default Pagination;
