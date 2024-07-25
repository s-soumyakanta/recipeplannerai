'use server'

import { signIn, signOut } from "@/auth";

export async function doLogout() {
  await signOut({redirectTo:"/"});
}

export async function doCredentialLogin(formData) {
  console.log("formData", formData);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('Request timed out');
      return { error: { message: 'Login request timed out. Please try again.' } };
    }
    throw err;
  }
}