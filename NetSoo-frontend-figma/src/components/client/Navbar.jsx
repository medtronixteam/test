"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
const navItems = [
  { name: "Home", href: "/" },
  {
    name: "Social Media",
    isDropdown: true,
    children: [
      { name: "Facebook", href: "/facebook" },
      { name: "Instagram", href: "/instagram" },
      { name: "Twitter", href: "/twitter" },
      { name: "TikTok", href: "/tiktok" },
    ],
  },
  { name: "Pricing", href: "/pricing" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact Us", href: "/contact" },
];
const Navbar = () => {
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [socialDropdownOpen, setSocialDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSocialDropdown = () => {
    setSocialDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSocialDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="max-w-screen-xl mx-auto py-6 px-4  relative z-50">
      <div className="flex items-center justify-between">
        <div className="md:hidden flex-1">
          <Link href="/">
            <img
              src="/images/logo.svg"
              alt="Logo"
              className="w-[50px] h-[50px]"
            />
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className=" w-[40px] h-[40px] flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X size={20} />
            ) : (
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2849_17491)">
                  <path
                    d="M2.99219 5.30737H14.7108"
                    stroke="white"
                    strokeWidth="1.46482"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.1875 9.7019H14.7088"
                    stroke="white"
                    strokeWidth="1.46482"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.38281 14.0962H14.7069"
                    stroke="white"
                    strokeWidth="1.46482"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2849_17491">
                    <rect
                      width="17.5779"
                      height="17.5779"
                      fill="white"
                      transform="translate(0.0625 0.912842)"
                    />
                  </clipPath>
                </defs>
              </svg>
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;

            if (item.isDropdown) {
              return (
                <div key={index} className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleSocialDropdown}
                    className={`flex items-center text-white/80 hover:text-[#3570BC] relative`}
                  >
                    {item.name}
                    <ChevronDown size={16} className="ml-1" />
                  </button>

                  {socialDropdownOpen && (
                    <div className="absolute -left-2 top-10 w-48 rounded-md bg-[#FFFFFF05] border border-[#FFFFFF30] shadow-lg backdrop-blur-md py-2 z-10">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href}
                          className="block px-4 py-2 text-white/80 hover:bg-[#FFFFFF10] hover:text-white transition"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={index}
                href={item.href}
                className={`relative text-white/80 hover:text-[#3570BC] pb-1 transition`}
              >
                <span className="relative px-1">
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-[3px] w-4 rounded-full bg-[#3570BC]" />
                  )}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <Link href="/">
            <img
              src="/images/logo.svg"
              alt="Logo"
              className="w-[70px] h-[70px]"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <Link
              href="/login"
              className="bg-[#FFFFFF05] hover:bg-white/10 text-white px-6 py-2.5 border border-[#FFFFFF30] rounded-full transition duration-300]"
            >
              Login
            </Link>
          </div>
          <div className="hidden md:block">
            <Link
              href="/register"
              className="bg-[#3570BC] hover:bg-blue-600 text-white px-6 py-2.5 rounded-full transition duration-300"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[url('/dashboard/dashboardBg.png')] bg-[length:100%_100%] bg-center p-4 z-40">
          <div className="flex flex-col space-y-4">
            {navItems.map((item, index) => {
              const isDropdownOpen = activeDropdown === item.name;

              if (!item.isDropdown) {
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-white hover:text-[#3570BC] py-2"
                    onClick={() => {
                      setIsOpen(false);
                      setActiveDropdown(null);
                    }}
                  >
                    {item.name}
                  </Link>
                );
              }

              return (
                <div key={index} className="w-full">
                  <button
                    onClick={() =>
                      setActiveDropdown(isDropdownOpen ? null : item.name)
                    }
                    className="flex items-center justify-between w-full text-white hover:text-[#3570BC] py-2"
                  >
                    {item.name}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="pl-4 flex flex-col space-y-2">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href}
                          className="text-gray-300 hover:text-[#3570BC] py-1"
                          onClick={() => {
                            setIsOpen(false);
                            setActiveDropdown(null);
                          }}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex flex-col space-y-3 pt-4">
              <Link
                href="/login"
                className="bg-[#FFFFFF05] text-center hover:bg-white/10 text-white px-6 py-2.5 border border-[#FFFFFF30] rounded-full transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#3570BC] text-center hover:bg-blue-600 text-white px-6 py-2.5 rounded-full transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
