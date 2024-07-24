"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiSun, FiMoon, FiSettings, FiUser, FiLogOut } from 'react-icons/fi';
import { doLogout } from '@/app/actions';
import { GiCook } from 'react-icons/gi';

interface NavbarProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ setIsSidebarOpen, isDarkMode, toggleDarkMode }) => {
  const pathname = usePathname();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-8xl mx-auto px-3 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="sm:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
              type="button"
              aria-label="Open menu"
            >
              <FiMenu size={24} />
            </button>
            <Link href="/dashboard" className="flex-shrink-0 flex items-center">
              {/* <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg> */}
              <GiCook className="text-2xl sm:text-3xl text-blue-600 dark:text-blue-300 inline-block" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">RecipePlannerAI</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800"
              aria-label="Switch mode"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <Link
              href="/dashboard/settings"
              className={`p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800 ${
                pathname === '/dashboard/settings' ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
              aria-label="Settings"
            >
              <FiSettings size={20} />
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800"
                aria-label="User menu"
              >
                <FiUser size={20} />
              </button>
              {isProfileDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john.doe@example.com</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={doLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      <FiLogOut className="mr-3" size={16} />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;