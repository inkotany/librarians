import { FileText } from "lucide-react";

const ExportButton = () => {
  return (
    <button
      className="flex items-center px-4 py-2 rounded-lg bg-primary text-white shadow-md transition-all duration-300 ease-in-out hover:bg-primary/80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <FileText className="stroke-1" />
      <span className="ml-2">Export</span>
    </button>
  );
};

export default ExportButton;
