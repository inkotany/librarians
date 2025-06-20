"use client";

import { useAcquireBookModal } from "@/app/stores/useAcquireBookModal";
import { Book } from "lucide-react";

const AcquireBooksButton = () => {
    const { open } = useAcquireBookModal();
    return (
        <button onClick={open}
            className="flex items-center px-4 py-2 rounded-lg bg-primary text-white shadow-md transition-all duration-300 ease-in-out hover:bg-primary/80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
            <Book className="w-5 h-5" strokeWidth={1} />
            <span className="ml-2">Acquire Books</span>
        </button>
    );
};

export default AcquireBooksButton;
