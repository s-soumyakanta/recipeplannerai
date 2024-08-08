"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8 relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/background.svg')" }}>
        <div className="relative z-10 text-center max-w-3xl mb-8">
          <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-transparent">
            RecipePlannerAI
          </h1>
          <p className="mt-4 text-sm md:text-xl">
            This AI-powered web app offers personalized recipe suggestions, meal
            planning, and cooking advice tailored to your preferences and
            dietary needs. Discover new dishes, optimize your grocery shopping,
            and revolutionize your cooking experience with our intuitive chat
            interface.
          </p>
        </div>

        <Link href="/dashboard">
          <button className="px-3 py-2 md:px-4 md:py-3 bg-white text-black rounded-xl flex font-semibold items-center space-x-2 uppercase">
            <span>Get Started</span> <ArrowRight />
          </button>
        </Link>
      </div>
    </>
  );
};

export default LandingPage;
