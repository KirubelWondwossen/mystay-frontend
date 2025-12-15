import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Search() {
  return (
    <div className="rounded-2xl shadow-lg flex justify-between items-center px-5 transform transition-transform duration-300 focus-within:-translate-y-1 focus-within:shadow-xl">
      <input
        type="search"
        className="dark:bg-surfaceDark text-heading text-lg p-5 focus:outline-none w-[30rem]"
        placeholder="Search"
      />
      <span className="bg-primary p-4 rounded-full text-center cursor-pointer">
        <MagnifyingGlassIcon className="w-6 h-6 text-white font-bold stroke-2" />
      </span>
    </div>
  );
}

export default Search;
