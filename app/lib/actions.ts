"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { createUser } from "@/app/lib/db";
import { User } from "./definitions";

export async function authenticate(prevState: unknown, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/app",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            fieldData: { email: formData.get("email")?.toString() },
            errorMessage: "Invalid credentials.",
          };
        default:
          return {
            fieldData: { email: formData.get("email")?.toString() },
            errorMessage: "Something went wront.",
          };
      }
    }
    throw error;
  }
}

export async function logout() {
  try {
    await signOut();
  } catch (error) {
    console.error(error);
    throw error;
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
