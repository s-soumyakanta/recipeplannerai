"use client";

import React from 'react';
import Link from 'next/link';
import { FiMenu, FiSun, FiMoon, FiSettings, FiUser } from 'react-icons/fi';

interface NavbarProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ setIsSidebarOpen, toggleDarkMode, isDarkMode }) => {
  return (
    <nav className="bg-red-800 dark:bg-red-950 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="sm:hidden mr-4 focus:outline-none focus:ring-2 focus:ring-white rounded-md p-1"
          type="button"
          aria-label="Open menu"
        >
          <FiMenu size={24} />
        </button>
        <Link href="/dashboard" className="text-md md:text-xl font-bold">RecipePlannerAI</Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
        <Link href="dashboard/settings"
          className="focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
          aria-label="Settings"
        >
          <FiSettings size={20} />
        </Link>
        <div
          className="focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1 cursor-pointer"
          aria-label="Profile"
        >
          <FiUser size={20} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;