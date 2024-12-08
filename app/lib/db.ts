import { sql } from "@vercel/postgres";
import type { User, Profile } from "@/app/lib/definitions";
import bcrypt from "bcrypt";

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getProfile(userId: string): Promise<Profile | undefined> {
  try {
    const profile =
      await sql<Profile>`SELECT * FROM profile WHERE user_id=${userId}`;
    return profile.rows[0];
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw new Error("Failed to fetch profile.");
  }
}

export async function createUser(user: User) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const formattedBirthdate = user.birthdate.toISOString().split("T")[0];
    await sql<User>`
      INSERT INTO users (name, email, password, birthdate, gender)
      VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${formattedBirthdate}, ${user.gender})
    `;
  } catch (error) {
    console.error("Failed to create user:", error);
    if (error instanceof Error && "detail" in error) {
      throw new Error((error as { detail: string }).detail);
    } else {
      throw new Error("Failed to create user.");
    }
  }
}

export async function updateProfile(userId: string, profileData: Profile) {
  try {
    //check if user already has a profile
    const profile =
      await sql<Profile>`SELECT * FROM profile WHERE user_id=${userId}`;

    if (profile.rows.length === 0) {
      //if user has a profile, update it
      await sql<Profile>`INSERT INTO PROFILE 
            (user_id, bio, looking_for, interests, non_negotiables, location, avatar_url)
                          VALUES 
            (${userId}, ${profileData.bio}, ${profileData.looking_for}, ${profileData.interests}, ${profileData.non_negotiables}, ${profileData.location}, ${profileData.avatar_url})`;
    } else {
      //if user does not have a profile, create one
      return await sql<Profile>`UPDATE profile 
                      SET 
                        bio=${profileData.bio}, 
                        looking_for=${profileData.looking_for}, 
                        interests=${profileData.interests}, 
                        non_negotiables=${profileData.non_negotiables}, 
                        location=${profileData.location}, 
                        avatar_url=${profileData.avatar_url} 
                      WHERE user_id=${userId}`;
    }
  } catch (error) {
    console.error("Failed to Update Profile:", error);
    throw new Error((error as any)?.detail || "Failed to update profile.");
  }
}
