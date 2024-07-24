"use client";

import {doCredentialLogin} from "@/app/actions"
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) {
      event.preventDefault();
      try {
          const formData = new FormData(event.currentTarget);

          const response = await doCredentialLogin(formData);

          if (!!response.error) {
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
    <>
    <div className="text-xl text-red-500">{error}</div>
     <form onSubmit={onSubmit} className="text-red-600">
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email"/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password"/>
        </div>
       <div>
       <button type="submit">Submit</button>
       </div>
     </form>

     
    </>
  )
}

export default LoginForm