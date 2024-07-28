"use client";

import { doCredentialLogin } from "@/app/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from 'next/image';

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await doCredentialLogin(formData);

      if (response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  return (
    <div className="w-full max-h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition duration-500 dark:text-white overflow-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="md:w-1/2 hidden md:block items-center justify-center bg-gray-300 dark:bg-gray-700">
          <div className="w-full h-full relative flex items-center justify-center">
            <Image
              src="/images/loginimage.webp"
              width={500}
              height={500}
              className="object-cover w-full h-full"
              alt="Login form"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">Login</h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form onSubmit={onSubmit} className="space-y-4">
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
                Submit
              </button>
            </div>
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>Don&apos;t have an account? <Link href="/register" className="text-indigo-500 hover:underline">Register</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
