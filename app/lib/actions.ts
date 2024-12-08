"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import * as db from "@/app/lib/db";
import { User, Gender, Profile } from "./definitions";
import { auth } from "@/auth";

export async function authenticate(_: unknown, formData: FormData) {
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
    if (formData.get("password") !== formData.get("confirmPassword")) {
      return {
        fieldData: {
          name: formData.get("name")?.toString(),
          email: formData.get("email")?.toString(),
          birthdate: formData.get("birthdate")?.toString(),
          gender: formData.get("gender")?.toString(),
        },
        errorMessage: "Passwords do not match.",
      };
    }

    const user: User = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      birthdate: new Date(formData.get("birthdate") as string),
      gender: formData.get("gender") as Gender,
    };
    await db.createUser(user);

    const authData = new FormData();
    authData.append("email", user.email);
    authData.append("password", user.password);

    await authenticate(undefined, authData);
  } catch (error) {
    // check for errors coming from the database

    return {
      fieldData: {
        name: formData.get("name")?.toString(),
        email: formData.get("email")?.toString(),
        birthdate: formData.get("birthdate")?.toString(),
        gender: formData.get("gender")?.toString(),
      },
      errorMessage:
        error instanceof Error ? error.message : "Something went wrong.",
    };
  }
}

export async function getProfile(userId: string) {
  try {
    const profile = await db.getProfile(userId);
    return profile;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUser(email: string) {
  try {
    const user = await db.getUser(email);
    return user;
  } catch (error) {
    console.error("getUser error: ", error);
    throw error;
  }
}

export async function updateProfile(_: unknown, formData: FormData) {
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  try {
    const session = await auth();
    if (!session) {
      throw Error("Not authenticated");
    }

    const user = await db.getUser(session?.user?.email as string);
    if (!user) {
      throw Error("User not found");
    }
    const { id } = user;

    const profile: Profile = {
      userId: id as string,
      bio: formData.get("bio") as string,
      looking_for: formData.get("looking_for") as string,
      interests: formData.get("interests") as string,
      non_negotiables: formData.get("non_negotiables") as string,
      location: formData.get("location") as string,
      avatar_url: formData.get("avatar_url") as string,
    };

    const res = await db.updateProfile(profile.userId, profile);

    if (res?.rowCount == 0) throw Error("Failed to update profile");
    return { fieldData: profile };
  } catch (error) {
    console.error(error);
    return {
      fieldData: {
        bio: formData.get("bio")?.toString(),
        looking_for: formData.get("looking_for")?.toString(),
        interests: formData.get("interests")?.toString(),
        non_negotiables: formData.get("non_negotiables")?.toString(),
        location: formData.get("location")?.toString(),
        avatar_url: formData.get("avatar_url")?.toString(),
      },
      errorMessage:
        error instanceof Error ? error.message : "Something went wrong.",
    };
  }
}
