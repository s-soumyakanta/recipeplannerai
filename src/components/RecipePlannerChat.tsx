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
    <div className="flex rounded-md flex-col h-[calc(100vh-100px)] md:h-[calc(100vh-100px)] bg-red-50 dark:bg-red-900 text-red-900 dark:text-red-50 overflow-hidden">
      {!isChatStarted ? (
        <div className="flex flex-col h-full justify-between">
          <div className="flex-grow flex flex-col justify-between overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col h-full justify-between">
              <div className="text-center">
                <GiCook className="text-4xl sm:text-5xl mb-2 text-red-600 dark:text-red-300 inline-block" />
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Welcome to RecipePlannerAI</h1>
                <p className="text-sm sm:text-base lg:text-lg mb-4 max-w-2xl mx-auto">
                  Create delicious recipes tailored to your available ingredients and dietary preferences. 
                  Let&apos;s start by setting up your profile!
                </p>
              </div>

              <div className="text-center py-4">
                <button
                  onClick={() => setIsChatStarted(true)}
                  className="bg-green-500 hover:bg-green-600 text-white text-base sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg transition duration-300 flex items-center mx-auto"
                >
                  <GiCook className="mr-2 text-lg sm:text-xl" aria-hidden="true" />
                  Suggest A Recipe
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white dark:bg-red-800 rounded-xl shadow-lg p-4 flex flex-col items-center text-center">
                  <GiMeal className="text-3xl sm:text-4xl mb-2 text-red-600 dark:text-red-300" />
                  <h2 className="text-lg sm:text-xl font-bold mb-2">What&apos;s in Your Kitchen?</h2>
                  <p className="text-xs sm:text-sm mb-4">
                    Tell us what ingredients you have on hand. This helps us create recipes 
                    that match what&apos;s available in your pantry and fridge.
                  </p>
                  <Link href="/dashboard/available-ingredients" 
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-xs sm:text-sm">
                    Set Available Ingredients
                  </Link>
                </div>
                
                <div className="bg-white dark:bg-red-800 rounded-xl shadow-lg p-4 flex flex-col items-center text-center">
                  <GiWeightScale className="text-3xl sm:text-4xl mb-2 text-red-600 dark:text-red-300" />
                  <h2 className="text-lg sm:text-xl font-bold mb-2">Your Dietary Preferences</h2>
                  <p className="text-xs sm:text-sm mb-4">
                    Let us know about any dietary restrictions or preferences you have. 
                    We&apos;ll ensure your recipes align with your nutritional needs.
                  </p>
                  <Link href="/dashboard/diet-preferences" 
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-xs sm:text-sm">
                    Set Diet Preferences
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full mb-2">
          <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-center p-2">RecipePlannerAI Chat</h1>
          <div className="flex-grow bg-white dark:bg-red-800 rounded-lg shadow-xl overflow-hidden flex flex-col mx-4">
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.role === 'user' ? 'bg-red-100 dark:bg-red-700 ml-auto' : 'bg-red-50 dark:bg-red-600'
                  } rounded-lg p-2 max-w-[80%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <p className="whitespace-pre-wrap text-xs sm:text-sm">{msg.content}</p>
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => copyToClipboard(msg.content)}
                      className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-100 mt-1"
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

            <form onSubmit={handleSubmit} className="p-2 border-t dark:border-red-700">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask for a recipe..."
                  className="flex-grow p-2 rounded-l-lg border border-red-300 dark:border-red-600 dark:bg-red-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
                  aria-label="Recipe request input"
                />
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-r-lg transition duration-300"
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