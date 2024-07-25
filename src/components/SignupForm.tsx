"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      if (response.status === 201) {
        router.push('/login');
      } else {
        setError("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <div className="w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition duration-500 dark:text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">Register</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              required 
              className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              required 
              className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400" 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              required 
              className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400" 
            />
          </div>
          <div>
            <button 
              type="submit" 
              className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center text-gray-600 dark:text-gray-400 mt-4">
          <p>Already have an account? <Link href="/login" className="text-indigo-500 hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
