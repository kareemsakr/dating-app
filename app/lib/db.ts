import { sql } from "@vercel/postgres";
import type { User } from "@/app/lib/definitions";
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

export async function createUser(user: User) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const formattedBirthdate = user.birthdate.toISOString().split("T")[0];
    await sql<User>`
      INSERT INTO users (name, email, password, birthdate)
      VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${formattedBirthdate})
    `;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw new Error("Failed to create user.");
  }
}
