import Link from "next/link"

const Page = () => {
  return (
    <div><h1>RecipePlannerAI | AI-Powered Recipe Assistant</h1>
    <Link href="/dashboard">
    <button>Dashboard</button>
    </Link>
    </div>
  )
}

export default Page