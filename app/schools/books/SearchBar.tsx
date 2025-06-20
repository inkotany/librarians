import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <form className="flex gap-2 w-5xl mx-auto items-center justify-center">
      <input
        type="text"
        placeholder="Find your books"
        className="w-2/3 py-3 max-md:py-2 px-5 rounded-full shadow-md border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-300"
      />
      <button className="bg-primary p-2 cursor-pointer rounded-full">
        <Search color="white" />
      </button>
    </form>
  );
};

export default SearchBar;
