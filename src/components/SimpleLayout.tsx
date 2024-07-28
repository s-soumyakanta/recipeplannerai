"use client";

import Link from "next/link";
import { GiCook } from "react-icons/gi";
import { FiSun, FiMoon } from "react-icons/fi";
import useDarkMode from "@/hooks/use-dark-mode";

interface LayoutProps {
  children: React.ReactNode;
}

const SimpleLayout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition duration-500">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-8xl mx-auto px-3 py-4 flex justify-between items-center">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <GiCook className="text-xl sm:text-3xl text-blue-600 dark:text-blue-500 inline-block" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              RecipePlannerAI
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

          </div>
        </div>
      </nav>
      <main className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default SimpleLayout;
