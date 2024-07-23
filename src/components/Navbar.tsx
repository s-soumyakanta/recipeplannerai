"use client";

import React from 'react';

interface NavbarProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setIsSidebarOpen }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">RecipePlannerAI</h1>
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="sm:hidden focus:outline-none"
        type="button"
        aria-label="Open menu"
      >
        <span className="block w-6 rounded-md h-0.5 bg-white mb-1"></span>
        <span className="block w-6 rounded-md h-0.5 bg-white mb-1"></span>
        <span className="block w-6 rounded-md h-0.5 bg-white"></span>
      </button>
    </nav>
  );
};

export default Navbar;