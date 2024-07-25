import Link from "next/link";
import { GiCook } from 'react-icons/gi';

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-500">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center">
        <GiCook className="text-6xl sm:text-8xl text-blue-500 dark:text-blue-300 mb-6 mx-auto" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          RecipePlannerAI
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-6">
          Your AI-Powered Recipe Assistant
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
              Dashboard
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page;
