"use client";

import useDarkMode from "@/hooks/use-dark-mode";
import Link from "next/link";
import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { GiCook } from "react-icons/gi";
import Image from "next/image";

function LandingPage() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <div className="dark:bg-gray-950 min-h-screen text-black dark:text-gray-100">
        <nav className="bg-white dark:bg-gray-950  border-b border-gray-200 dark:border-gray-700 md:px-8 lg:py-2 lg:px-24">
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
              <Link href="/login">
                <button className=" bg-indigo-600 text-white  lg:px-5 lg:py-2 md:px-3 md:py-3 px-3 py-2 rounded-lg">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </nav>
        <div className="max-w-sm mx-auto mt-10 space-y-8 md:max-w-xl lg:flex lg:flex-row lg:max-w-6xl lg:mt-32">
          <div className="space-y-6 lg:w-1/2 lg:space-y-10">
            <h2 className="text-5xl max-w-52 md:max-w-sm font-extrabold lg:text-6xl lg:max-w-md">Chat With AI To Create Your Recipes</h2>
            <p className="text-base md:text-lg">
              This AI-powered web app offers personalized recipe suggestions,
              meal planning, and cooking advice tailored to your preferences and
              dietary needs. Discover new dishes, optimize your grocery
              shopping, and revolutionize your cooking experience with our
              intuitive chat interface.
            </p>
            <div>
              <Link href="/register">
                <button className="px-6 bg-indigo-600 text-white py-4 rounded-lg text-lg">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className=" lg:w-1/2">
            <Image
              src="/images/landingpage.png"
              width={500}
              height={500}
              alt="App Images"
              className="w-full "
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
