"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoClose, IoHomeOutline, IoListOutline, IoNutritionOutline, IoCloudOutline } from "react-icons/io5";
import { GiCook } from "react-icons/gi";

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
    { id: "dashboard", name: "Dashboard", href: "/dashboard", icon: <IoHomeOutline className="text-lg" /> },
    {
      id: "availableIngredients",
      name: "Available Ingredients",
      href: "/dashboard/available-ingredients",
      icon: <IoListOutline className="text-lg" />,
    },
    {
      id: "dietPreferences",
      name: "Diet Preferences",
      href: "/dashboard/diet-preferences",
      icon: <IoNutritionOutline className="text-lg" />,
    },
  ];

  const handleTabClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-4/5 max-w-xs transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-72 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}
      >
        <div className="flex flex-col overflow-y-auto px-3 py-4 h-full">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6 md:hidden">
              <div className="flex space-x-1 items-center">
                <GiCook className="text-xl text-blue-600 dark:text-blue-500 inline-block" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">RecipePlannerAI</h2>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-100 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200 rounded-full"
                type="button"
                aria-label="Close menu"
              >
                <IoClose size={24} />
              </button>
            </div>

            <nav className="space-y-3">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.href}
                  onClick={handleTabClick}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    pathname === tab.href
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto">
            <div className="rounded-lg bg-white dark:bg-gray-700 p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                <IoCloudOutline className="mr-2" />
                Local Weather
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Weather data goes here</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
