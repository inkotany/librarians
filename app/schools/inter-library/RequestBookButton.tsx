import { BookOpen } from "lucide-react";

const RequestBookButton = () => {
  return (
    <button
      className="flex items-center px-4 py-2 rounded-lg bg-primary text-white shadow-md transition-all duration-300 ease-in-out hover:bg-primary/80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <BookOpen className="w-5 h-5" strokeWidth={1.5} />
      <span className="ml-2">Request a Book</span>
    </button>
  );
};

export default RequestBookButton;
