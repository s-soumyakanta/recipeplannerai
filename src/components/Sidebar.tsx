"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const pathname = usePathname();

  const tabs = [
    { id: "dashboard", name: "Dashboard", href: "/dashboard" },
    {
      id: "availableIngredients",
      name: "Available Ingredients",
      href: "/dashboard/available-ingredients",
    },
    {
      id: "dietPreferences",
      name: "Diet Preferences",
      href: "/dashboard/diet-preferences",
    },
  ];

  const handleTabClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-40 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed sm:relative top-0 left-0 z-50 h-full bg-red-900 dark:bg-red-950 text-red-100 overflow-y-auto transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-5/6" : "w-0"}
          sm:w-64 md:w-72 lg:w-80 sm:transform-none
        `}
      >
        <div className="flex flex-col h-full">
          {/* Top part - Navigation Tabs */}
          <div className="p-4 flex-grow">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className=" focus:outline-none focus:ring-2 focus:ring-white  sm:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-red-200 hover:text-white transition-colors duration-200 bg-transparent hover:bg-red-500 rounded-full p-2"
              type="button"
              aria-label="Close menu"
            >
              <IoClose size={48} />
            </button>

            {isSidebarOpen && (
              <h2 className="text-xl font-bold mb-6 text-red-100">
                RecipePlannerAI
              </h2>
            )}
            <nav>
              <ul>
                {tabs.map((tab) => (
                  <li key={tab.id} className="mb-2">
                    <Link
                      href={tab.href}
                      className={`block p-2 rounded transition-colors
                        ${
                          pathname === tab.href
                            ? "bg-red-700 dark:bg-red-800 text-white"
                            : "text-red-200 hover:bg-red-800 dark:hover:bg-red-900 hover:text-white"
                        }`}
                      onClick={handleTabClick}
                    >
                      {tab.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Bottom part - Weather Data */}
          <div className="p-4 bg-red-800 dark:bg-red-900">
            <h3 className="text-sm font-semibold mb-2 text-red-100">
              Local Weather
            </h3>
            <p className="text-red-200">Weather data</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
