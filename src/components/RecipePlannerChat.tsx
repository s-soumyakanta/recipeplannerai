"use client";

import React, { useRef, useEffect, useState } from 'react';
import { FiSend, FiCopy } from 'react-icons/fi';
import { GiCook, GiMeal, GiWeightScale } from 'react-icons/gi';
import Link from 'next/link';
import { useChat } from 'ai/react';

const RecipePlannerChat: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [isChatStarted, setIsChatStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex rounded-md flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-120px)] text-blue-900 dark:text-blue-50 overflow-hidden">
      {!isChatStarted ? (
        <div className="flex flex-col h-full justify-between">
          <div className="flex-grow flex flex-col justify-between">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col h-full justify-between">
              <div className="text-center">
                <GiCook className="text-4xl sm:text-5xl mb-4 text-blue-600 dark:text-blue-300 inline-block" />
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Welcome to RecipePlannerAI</h1>
                <p className="text-sm sm:text-base lg:text-lg mb-6 max-w-2xl mx-auto">
                  Create delicious recipes tailored to your available ingredients and dietary preferences. 
                </p>
              </div>

              <div className="text-center py-4">
                <button
                  onClick={() => setIsChatStarted(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-base sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg transition duration-300 flex items-center mx-auto transform hover:scale-105"
                >
                  <GiCook className="mr-2 text-lg sm:text-xl" aria-hidden="true" />
                  Suggest A Recipe
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white dark:bg-blue-800 rounded-xl shadow-lg p-4 flex flex-col items-center text-center backdrop-filter backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80 transition duration-300 hover:shadow-xl">
                  <GiMeal className="text-3xl sm:text-4xl mb-3 text-blue-600 dark:text-blue-300" />
                  <h2 className="text-lg sm:text-xl font-bold mb-2">What&apos;s in Your Kitchen?</h2>
                  <p className="text-xs sm:text-sm mb-4">
                    Tell us what ingredients you have on hand. This helps us create recipes 
                    that match what&apos;s available in your pantry and fridge.
                  </p>
                  <Link href="/dashboard/available-ingredients" 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-xs sm:text-sm transform hover:scale-105">
                    Set Available Ingredients
                  </Link>
                </div>
                
                <div className="bg-white dark:bg-blue-800 rounded-xl shadow-lg p-4 flex flex-col items-center text-center backdrop-filter backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80 transition duration-300 hover:shadow-xl">
                  <GiWeightScale className="text-3xl sm:text-4xl mb-3 text-blue-600 dark:text-blue-300" />
                  <h2 className="text-lg sm:text-xl font-bold mb-2">Your Dietary Preferences</h2>
                  <p className="text-xs sm:text-sm mb-4">
                    Let us know about any dietary restrictions or preferences you have. 
                    We&apos;ll ensure your recipes align with your nutritional needs.
                  </p>
                  <Link href="/dashboard/diet-preferences" 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-xs sm:text-sm transform hover:scale-105">
                    Set Diet Preferences
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full mb-2">
          <h1 className="text-xl sm:text-2xl font-bold mb-3 text-center p-2">RecipePlannerAI Chat</h1>
          <div className="flex-grow bg-white dark:bg-blue-800 rounded-lg shadow-xl overflow-hidden flex flex-col mx-4 backdrop-filter backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80">
            <div className="flex-grow overflow-y-auto p-3 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.role === 'user' ? 'bg-blue-100 dark:bg-blue-700 ml-auto' : 'bg-blue-50 dark:bg-blue-600'
                  } rounded-lg p-2 max-w-[80%] ${msg.role === 'user' ? 'text-right' : 'text-left'} shadow-md`}
                >
                  <p className="whitespace-pre-wrap text-xs sm:text-sm">{msg.content}</p>
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => copyToClipboard(msg.content)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100 mt-1 transition duration-300"
                      aria-label="Copy recipe to clipboard"
                    >
                      <FiCopy size={14} aria-hidden="true" />
                      <span className="sr-only">Copy recipe</span>
                    </button>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-center">
                  <div className="loader" aria-label="Loading"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-2 border-t dark:border-blue-700">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask for a recipe..."
                  className="flex-grow p-2 rounded-l-lg border border-blue-300 dark:border-blue-600 dark:bg-blue-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                  aria-label="Recipe request input"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-lg transition duration-300 transform hover:scale-105"
                  aria-label="Send recipe request"
                >
                  <FiSend size={18} aria-hidden="true" />
                  <span className="sr-only">Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipePlannerChat;