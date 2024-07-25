"use client";

import Link from "next/link";
import { GiCook } from "react-icons/gi";

interface LayoutProps {
  children: React.ReactNode;
}

const SimpleLayout: React.FC<LayoutProps> = ({ children }) => {
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
          {/* <div className="flex items-center space-x-4">
            <Link href="/login">
              <button className="bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 transition duration-300">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-indigo-500 text-white py-2 px-3 rounded-md hover:bg-indigo-600 transition duration-300">
                Register
              </button>
            </Link>
          </div> */}
        </div>
      </nav>
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
};

export default SimpleLayout;
