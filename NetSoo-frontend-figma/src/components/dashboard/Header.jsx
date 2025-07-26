import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";
import HeaderRight from "./HeaderRight";

const Header = ({ onSidebarToggle, onClose, isSidebarOpen }) => {
  return (
    <header className=" border-b border-[#4A4A4A] text-white p-6 h-[90px] sticky top-0 z-40 shadow flex items-center  justify-between">
      <div className="md:hidden flex ">
        <img src="/images/logo.svg" alt="Logo" className="w-[40px] h-[40px]" />
      </div>
      <div className="hidden md:block">
        <SearchBar />
      </div>
      <div className="flex items-center gap-4">
        <HeaderRight />
        {isSidebarOpen ? (
          <button className="md:hidden  text-white" onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        ) : (
          <button className="md:hidden  text-white" onClick={onSidebarToggle}>
            <Menu className="w-6 h-6" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
// bg-gradient-to-r from-[#522E7E] to-[#5B3A8B]
