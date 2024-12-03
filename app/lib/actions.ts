"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { createUser } from "@/app/lib/db";
import { User } from "./definitions";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  } finally {
    redirect("/app");
  }
}

export async function logout() {
  try {
    await signOut();
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    redirect("/");
  }
}

export async function registerUser(prevState: unknown, formData: FormData) {
  try {
    const user: User = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      birthdate: new Date(formData.get("birthdate") as string),
    };
    await createUser(user);

    const authData = new FormData();
    authData.append("email", user.email);
    authData.append("password", user.password);

    return await authenticate(undefined, authData);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
