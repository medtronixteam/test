import { Search } from "lucide-react";

const SearchInput = ({
  placeholder = "Search here",
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`relative mb-4 ${className}`}>
      <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-[#4A4A4A] rounded-[8px] pl-10 pr-4 py-2 text-sm bg-transparent text-white placeholder-gray-400"
      />
    </div>
  );
};

export default SearchInput;
