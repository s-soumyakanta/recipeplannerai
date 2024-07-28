"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) {
    event.preventDefault();
    setIsLoading(true);

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
        toast.success("Registration successful! Redirecting to login...", { position: "top-right" });
        router.push('/login');
      } else {
        setError("Failed to register. Please try again.");
        toast.error("Failed to register. Please try again.", { position: "top-right" });
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition duration-500 dark:text-white overflow-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="md:w-1/2 hidden md:block items-center justify-center bg-gray-300 dark:bg-gray-700">
          <div className="w-full h-full relative flex items-center justify-center">
            <Image
              src="/images/signupimage.webp"
              width={500}
              height={500}
              className="object-cover w-full h-full"
              alt="Sign up form"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 space-y-6">
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
                className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300 inline-flex justify-center items-center"
              >
                {isLoading && (
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>
                )}
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
          <div className="text-center text-gray-600 dark:text-gray-400 mt-4">
            <p>Already have an account? <Link href="/login" className="text-indigo-500 hover:underline">Login</Link></p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignupForm;
