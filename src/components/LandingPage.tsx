"use client";

import React from "react";
import useDarkMode from "@/hooks/use-dark-mode";
import Link from "next/link";
import Image from "next/image";
import { FiMoon, FiSun } from "react-icons/fi";
import { GiCook } from "react-icons/gi";

const reasons = [
  "Personalized Recipes",
  "Meal Planning",
  "Grocery Optimization",
  "Dietary Preferences",
  "Cooking Tips",
  "Nutritional Insights",
];

const foodImages = [
  { src: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg", alt: "Food 1" },
  { src: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg", alt: "Food 2" },
  { src: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg", alt: "Food 3" },
  { src: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg", alt: "Food 4" },
  { src: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg", alt: "Food 5" },
  { src: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg", alt: "Food 6" },
  { src: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg", alt: "Food 7" },
  { src: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg", alt: "Food 8" },
];

function LandingPage() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const currentYear = new Date().getFullYear();



  return (
    <>
      <div className="dark:bg-gray-950 min-h-screen text-black dark:text-gray-100">
        <nav className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700 md:px-8 lg:py-2 lg:px-24 sticky top-0 z-50">
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
                <button className="bg-indigo-600 text-white lg:px-5 lg:py-2 md:px-3 md:py-3 px-3 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-xs mx-auto mt-10 space-y-8 md:max-w-xl lg:flex lg:flex-row lg:max-w-4xl xl:max-w-6xl lg:mt-32">
          <div className="space-y-6 lg:w-1/2 lg:space-y-10">
            <h2 className="text-5xl max-w-52 md:max-w-sm font-extrabold lg:text-6xl lg:max-w-md">
              Chat With AI To Create Your Recipes
            </h2>
            <p className="text-base md:text-lg">
              This AI-powered web app offers personalized recipe suggestions,
              meal planning, and cooking advice tailored to your preferences and
              dietary needs. Discover new dishes, optimize your grocery
              shopping, and revolutionize your cooking experience with our
              intuitive chat interface.
            </p>
            <div>
              <Link href="/register">
                <button className="px-6 bg-indigo-600 text-white py-4 rounded-lg text-lg hover:bg-indigo-700 transition duration-300">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex items-center">
            <Image
              src="/images/landingpage.png"
              alt="Landing Page"
              width={500}
              height={300}
            />
          </div>
        </div>


        {/* Why Choose Section */}
        <section className="min-h-screen px-4 md:px-8 lg:px-24 py-12 bg-white dark:bg-gray-950 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Why Choose RecipePlannerAI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="p-6 bg-indigo-200 dark:bg-indigo-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold mb-2 text-indigo-800 dark:text-indigo-200">
                  {reason}
                </h3>
                <p className="text-indigo-800 dark:text-indigo-400">
                  {`Our AI tailors recipes based on your ${reason.toLowerCase()}.`}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center py-20">
          <h2 className="text-4xl font-extrabold mb-6">
            Ready to Start Cooking?
          </h2>
          <p className="text-lg mb-10 max-w-sm md:max-w-3xl">
            Join thousands of users who have transformed their cooking with
            RecipePlannerAI. Whether you&lsquo;re a beginner or a pro, our app adapts
            to you.
          </p>
          <Link href="/register">
            <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors duration-300">
              Sign Up Now
            </button>
          </Link>
        </section>
        <section>
        <footer className="bg-indigo-600 shadow dark:bg-indigo-700">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              RecipePlannerAI
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-200 sm:mb-0">
            <li>
              <a href="https://github.com/s-soumyakanta/recipeplannerai" className="hover:underline me-4 md:me-6 text-gray-200">
                Star Repo
              </a>
            </li>
            <li>
              <a href="https://github.com/s-soumyakanta/recipeplannerai/issues" className="hover:underline me-4 md:me-6 text-gray-200">
                Report Bug
              </a>
            </li>
            <li>
              <a href="https://s-soumyakanta.com" className="hover:underline me-4 md:me-6 text-gray-200">
                Creator Profile
              </a>
            </li>
            <li>
              <a href="https://github.com/s-soumyakanta/recipeplannerai" className="hover:underline text-gray-200">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-400 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-200 sm:text-center">
          © {currentYear}{" "}
          <a href="/" className="hover:underline text-gray-200">
            RecipePlannerAI™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
        </section>
      </div>
    </>
  );
}

export default LandingPage;
