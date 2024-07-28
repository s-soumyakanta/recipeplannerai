"use client";

import Link from "next/link";
import { GiCook } from "react-icons/gi";
import { FiSun, FiMoon } from "react-icons/fi";
import useDarkMode from "@/hooks/use-dark-mode";

const Page = () => {
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
      <div className="flex items-center justify-center flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center">
          <GiCook className="text-6xl sm:text-8xl text-blue-500 dark:text-blue-300 mb-6 mx-auto" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            RecipePlannerAI
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-6">
            Your AI-Powered Recipe Assistant
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                Dashboard
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
