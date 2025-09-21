"use server";
import { auth } from "@/auth";

export async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const data = await auth.api.signInEmail({
      body: {
        password,
        email,
      },
    });

    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
