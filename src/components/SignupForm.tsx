"use client";

import Link from "next/link"
import { useRouter } from "next/navigation";

const SignupForm = () => {
    const router = useRouter()

    async function handleSubmit(event: any) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);
            const name = formData.get("name")
            const email = formData.get("email")
            const password = formData.get("password")

            const response = await fetch(`/api/register`,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            response.status === 201 && router.push('/login')
        } catch (error) {
            console.error(error)
        }
        
    }
  return (
    <>
    <div className="text-green-700">
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name"/>
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email"/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password"/>
        </div>
       <div>
       <button type="submit">Register</button>
       </div>
        </form>
    </div>
    <div>
        <p>Already have an account? <Link href="/login">Login</Link></p>
       </div>
    </>
  )
}

export default SignupForm