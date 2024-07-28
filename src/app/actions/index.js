'use server';

import { signIn, signOut } from "@/auth";
import { connectDB } from "@/lib/mongo";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData) {
  await connectDB();
  
  console.log("formData", formData);

  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}
