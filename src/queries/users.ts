import { User } from "@/model/userModel"
export async function createUser(user: any){
   try {
    await User.create(user)
   } catch (e) {
    const errorMessage =
    e instanceof Error ? e.message : "Unknown error occurred while connecting db!";
    throw new Error(errorMessage);
  
  } 
}