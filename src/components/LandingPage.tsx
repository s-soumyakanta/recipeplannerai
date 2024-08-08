"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/background.svg')" }}
      >
        <div className="relative z-10 text-center max-w-3xl mb-8">
          <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-transparent">
            RecipePlannerAI
          </h1>
          <p className="mt-4 text-base md:text-xl">
            This AI-powered web app offers personalized recipe suggestions, meal
            planning, and cooking advice tailored to your preferences and
            dietary needs. Discover new dishes, optimize your grocery shopping,
            and revolutionize your cooking experience with our intuitive chat
            interface.
          </p>
        </div>

        <Link href="/dashboard">
          <button className="w-full max-w-xs px-3 py-2 md:px-4 md:py-3 hover:bg-gray-100 bg-gray-200 text-black rounded-xl flex items-center justify-center font-semibold space-x-2 uppercase transition duration-300 hover:bg-primary-light dark:hover:bg-primary-dark">
            <span>Get Started</span> <ArrowRight />
          </button>
        </Link>

        <div className="absolute bottom-0 right-0 p-4">
          <h2 className="text-xs">
            By{" "}
            <Link href="https://s-soumyakanta.com">
              <span className="bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-transparent">
                S Soumyakanta
              </span>
            </Link>
          </h2>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
