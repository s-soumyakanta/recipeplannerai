import RecipePlannerChat from "@/components/RecipePlannerChat"
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
const page = async () => {
  const session = await auth();

  if (!session?.user) redirect("/login");
console.log(session)
  return <RecipePlannerChat />
}

export default page