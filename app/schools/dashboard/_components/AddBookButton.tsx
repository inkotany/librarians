"use client";

import { useAddBookModal } from "@/app/stores/useAddBookModal";
import { PlusCircle } from "lucide-react";

const AddBookButton = () => {
    const { open } = useAddBookModal();
    return (
        <button onClick={open} className="flex items-center px-4 py-2 rounded-lg bg-primary text-white shadow-md transition-all duration-300 ease-in-out hover:bg-primary/80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50">
            <PlusCircle className="w-5 h-5" />
            <span className="ml-2">Add Book</span>
        </button>
    )
}

export default AddBookButton
