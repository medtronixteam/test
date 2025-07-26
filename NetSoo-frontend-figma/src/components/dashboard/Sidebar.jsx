import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);
  const router = useRouter();

  const isAdminPanel = pathname.startsWith("/adminPanel");

  const links = isAdminPanel
    ? [
        {
          label: "Dashboard",
          icon: "/admin/Dashboard.svg",
          path: "/adminPanel",
        },
        {
          label: "Global Metrics",
          icon: "/admin/Global.svg",
          path: "/adminPanel/global-metrics",
        },
        {
          label: "Affiliate Management",
          icon: "/admin/Affiliate.svg",
          path: "/adminPanel/affiliate-management",
        },
        {
          label: "Legal Content",
          icon: "/admin/Legal.svg",
          path: "/adminPanel/legal-content",
        },
        {
          label: "User Management",
          icon: "/admin/User.svg",
          path: "/adminPanel/user-management",
        },
        {
          label: "System Settings",
          icon: "/admin/Settings.svg",
          path: "/adminPanel/system-settings",
        },
      ]
    : [
        {
          label: "Dashboard",
          icon: "/dashboard/category.svg",
          path: "/dashboard",
        },
        {
          label: "Analytics",
          icon: "/dashboard/Analytics.svg",
          path: "/dashboard/analytics",
        },
        {
          label: "Connections",
          icon: "/dashboard/Connections.svg",
          path: "/dashboard/connections",
        },
        {
          label: "Schedule",
          icon: "/dashboard/Schedule.svg",
          path: "/dashboard/schedule",
        },

        {
          label: "Plans and billing",
          icon: "/dashboard/billing.svg",
          path: "/dashboard/plans-billing",
        },

        {
          label: "Profile and Settings",
          icon: "/dashboard/User.svg",
          path: "/dashboard/settings",
        },
        {
          label: "Chat",
          icon: "/dashboard/Chat.svg",
          path: "/dashboard/inbox",
        },
      ];

  const handleLinkClick = (path) => {
    setActiveTab(path);
    router.push(path);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          isOpen ? "block" : "hidden"
        } md:hidden`}
        onClick={onClose}
      />

      <aside
        className={` border-r border-[#4A4A4A] fixed top-0 left-0 h-full min-w-[270px]  z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <div className="mb-6 flex items-center justify-center p-4">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="w-[70px] h-[70px]"
          />
        </div>

        <div className="overflow-y-auto h-[calc(100vh-130px)]">
          <nav className="flex flex-col space-y-2 p-4">
            {links.map(({ label, icon, path }) => (
              <Link
                key={label}
                href={`${path}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(path);
                }}
                className={`flex items-center  gap-2 text-white hover:bg-[#20262E] ${
                  pathname === path
                    ? "bg-gradient-to-r from-[#20262E]  border-l-2 border-[#3570BC] font-bold"
                    : ""
                } p-4 rounded-[10px]`}
              >
                <img src={icon} alt={label} className="w-[25px] h-[25px]" />
                <span className="mt-[2px]">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
