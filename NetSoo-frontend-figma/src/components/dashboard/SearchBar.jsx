import React from "react";

const SearchBar = () => {
  return (
    <div>
      <form className="flex bg-transparent border border-[#4A4A4A] rounded-[8px]  text-white text-lg">
        <div className="text-white w-10 grid place-content-center text-zinc-400 pl-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
        <input
          type="text"
          name="text"
          className="bg-transparent py-2 outline-none placeholder:text-zinc-400 w-72 transition-all"
          placeholder="Search here"
        />
      </form>
    </div>
  );
};

export default SearchBar;
