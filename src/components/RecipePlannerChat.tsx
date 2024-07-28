"use client";

import React, { useState } from 'react';
import { GiCook, GiMeal, GiWeightScale } from 'react-icons/gi';
import { FaRobot } from 'react-icons/fa';
import Link from 'next/link';
import ChatSection from './ChatSection';

const RecipePlannerChat: React.FC = () => {
  const [isChatStarted, setIsChatStarted] = useState(false);

  return (
    <div className="flex rounded-md flex-col h-full md:h-[97%] text-blue-900 dark:text-blue-50 overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-blue-900">
      {!isChatStarted ? (
        <div className="flex flex-col  justify-between p-3 h-full overflow-auto">
          <div className="flex-grow flex flex-col justify-between">
            <div className="max-w-4xl mx-auto w-full flex flex-col h-full justify-between">
              <div className="text-center">
                <div className="mb-6 inline-block p-4 bg-blue-100 dark:bg-blue-800 rounded-full">
                  <GiCook className="text-5xl sm:text-6xl text-blue-600 dark:text-blue-300" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-blue-800 dark:text-blue-200">Welcome to RecipePlannerAI</h1>
                <p className="text-base lg:text-lg mb-4 max-w-2xl mx-auto text-blue-700 dark:text-blue-300">
                  Discover delicious recipes tailored to your ingredients and dietary preferences.
                </p>
              </div>

              <div className="text-center py-6">
                <button
                  onClick={() => setIsChatStarted(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg sm:text-xl font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full shadow-lg transition duration-300 flex items-center mx-auto transform hover:scale-105 hover:shadow-xl"
                >
                  <FaRobot className="mr-3 text-xl sm:text-2xl" aria-hidden="true" />
                  Start AI Recipe Chat
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-white dark:bg-blue-800 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition duration-300 hover:shadow-2xl transform hover:-translate-y-1 w-full">
                  <GiMeal className="text-4xl sm:text-5xl mb-4 text-blue-600 dark:text-blue-300" />
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">What&apos;s in Your Kitchen?</h2>
                  <p className="text-sm sm:text-base mb-6 text-blue-700 dark:text-blue-200">
                    Tell us what ingredients you have on hand. We&apos;ll create recipes 
                    that match what&apos;s available in your pantry and fridge.
                  </p>
                  <Link href="/dashboard/available-ingredients" 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 text-sm sm:text-base transform hover:scale-105 shadow-md hover:shadow-lg">
                    Set Available Ingredients
                  </Link>
                </div>
                
                <div className="bg-white dark:bg-blue-800 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition duration-300 hover:shadow-2xl transform hover:-translate-y-1 w-full">
                  <GiWeightScale className="text-4xl sm:text-5xl mb-4 text-blue-600 dark:text-blue-300" />
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">Your Dietary Preferences</h2>
                  <p className="text-sm sm:text-base mb-6 text-blue-700 dark:text-blue-200">
                    Let us know about any dietary restrictions or preferences you have. 
                    We&apos;ll ensure your recipes align with your nutritional needs.
                  </p>
                  <Link href="/dashboard/diet-preferences" 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 text-sm sm:text-base transform hover:scale-105 shadow-md hover:shadow-lg">
                    Set Diet Preferences
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <ChatSection />
        </div>
      )}
    </div>
  );
};

export default RecipePlannerChat;
