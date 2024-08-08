import { auth } from "@/auth";
import LandingPage from "@/components/LandingPage";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (session?.user) redirect("/dashboard");
  
  return <LandingPage />
}

export default page;
