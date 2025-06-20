"use client";
import { useAddBookModal } from "@/app/stores/useAddBookModal";
import { PlusCircle } from "lucide-react";

const AddBook = () => {
  const { open } = useAddBookModal();
  return (
    <button
      onClick={() => open()}
      className="flex items-center px-4 w-36 py-2 rounded-lg text-center bg-primary text-white shadow-md transition-all duration-300 ease-in-out hover:bg-primary/80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <PlusCircle className="stroke-1" size={20} />
      <span className="ml-3 font-medium">New Book</span>
    </button>
  );
};

export default AddBook;
