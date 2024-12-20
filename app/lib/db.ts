import { sql } from "@vercel/postgres";
import type {
  User,
  Profile,
  MatchRequest,
  Match,
  matchResultSearchResult,
  UserProfile,
} from "@/app/lib/definitions";
import bcrypt from "bcrypt";

export async function getUser(email: string): Promise<User> {
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

export async function getUserProfile(userId: string): Promise<UserProfile> {
  try {
    const userProfiles = await sql<UserProfile>`select 
        u.id as user_id,
        u.name,
        u.gender,
        u.birthdate,
        p.interests,
        p.avatar_url,
        p.bio,
        p.looking_for,
        p.non_negotiables,
        p.location    
      from users u
      inner join profile p on p.user_id = u.id
      where u.id = ${userId}`;
    return userProfiles.rows[0];
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw new Error("Failed to fetch user profile.");
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
    if (error instanceof Error && "detail" in error) {
      throw new Error((error as { detail: string }).detail);
    } else {
      throw new Error("Failed to update profile.");
    }
  }
}

export async function createMatchRequest(userId: string, notes: string) {
  try {
    const hasActiveRequest =
      await sql<MatchRequest>`select * from match_requests where status = 'pending' and user_id = ${userId}`;
    if (hasActiveRequest.rows.length > 0) {
      throw Error("You already have an active match request.");
    }
    await sql<MatchRequest>`INSERT INTO match_requests (user_id, notes)
              VALUES (${userId}, ${notes})`;
  } catch (error: Error | unknown) {
    console.error("Failed to create match request:", error);
    if (error instanceof Error && "detail" in error) {
      throw Error(
        (error as { detail: string }).detail ||
          "Failed to create match request."
      );
    } else {
      throw Error("Failed to create match request.");
    }
  }
}

export async function getMatchRequest(userId: string) {
  try {
    const matchRequest = await sql<matchResultSearchResult>`SELECT 
      u.id as user_id,
      u.name,
      u.gender,
      u.birthdate,
      p.interests,
      p.avatar_url,
      mr.id as match_request_id,
      mr.notes,
      mr.status,
      mr.created_at,
      p.bio,
      p.looking_for,
      p.non_negotiables,
      p.location
    FROM match_requests mr
    inner join users u on u.id = mr.user_id
    inner join profile p on p.user_id = mr.user_id
    WHERE mr.user_id = ${userId} AND status = 'pending'`;
    return matchRequest.rows[0];
  } catch (error) {
    console.error("Failed to fetch match request:", error);
    throw new Error("Failed to fetch match request.");
  }
}

export async function searchMatchRequests(
  status?: string,
  createdDateStart?: Date,
  createdDatedEnd?: Date
  // userId?: string
) {
  try {
    const pageSize = 10; // Number of records per page
    const pageNumber = 1; // Specific page number

    const offset = (pageNumber - 1) * pageSize;
    let startDate = new Date("1970-01-01");
    let endDate = new Date("3000-01-01");
    if (createdDateStart) startDate = createdDateStart;
    if (createdDatedEnd) endDate = new Date();
    const matchRequests = await sql<matchResultSearchResult>`
    SELECT 
    u.id as user_id,
    u.name,
    u.gender,
    u.birthdate,
    p.interests,
    p.avatar_url,
    mr.id as match_request_id,
    mr.notes,
    mr.status,
    mr.created_at,
    p.bio,
    p.looking_for,
    p.non_negotiables,
    p.location
    FROM match_requests mr
    inner join users u on u.id = mr.user_id
    inner join profile p on p.user_id = mr.user_id
    WHERE created_at BETWEEN ${startDate.toISOString().split("T")[0]} AND ${
      endDate.toISOString().split("T")[0]
    }
      AND status in (${status || "pending"})
      order by mr.created_at asc
      LIMIT ${pageSize} OFFSET ${offset}`;

    return matchRequests.rows;
  } catch (error) {
    if (error instanceof Error && "detail" in error) {
      throw Error(
        (error as { detail: string }).detail ||
          error.message ||
          "Failed to search match requests."
      );
    } else {
      throw Error("Failed to search match requests.");
    }
  }
}

export async function createMatch(
  user1: string,
  user2: string,
  matchMakerId: string
) {
  try {
    await sql<Match>`INSERT INTO matches (user1, user2, match_maker, expires_at)
              VALUES (${user1}, ${user2}, ${matchMakerId}, CURRENT_DATE + INTERVAL '7 days')`;
  } catch (error) {
    console.error("Failed to create match:", error);
    if (error instanceof Error && "detail" in error) {
      if (
        "detail" in error &&
        (error.detail as string).includes("already exists")
      )
        throw new Error("Match already exists");
      throw new Error((error as { detail: string }).detail);
    } else {
      throw new Error("Failed to create match.");
    }
  }
}

export async function closeMatchRequest(matchRequestId: string) {
  try {
    console.log("Closing match request", matchRequestId);
    await sql<MatchRequest>`UPDATE match_requests
              SET status = 'closed'
              WHERE id = ${matchRequestId}`;
  } catch (error) {
    console.error("Failed to close match request:", error);
    if (error instanceof Error && "detail" in error) {
      throw new Error((error as { detail: string }).detail);
    } else {
      throw new Error("Failed to close match request.");
    }
  }
}

export async function getActiveMatch(userId: string) {
  try {
    const match =
      await sql<Match>`SELECT * FROM matches WHERE user1 = ${userId} OR user2 = ${userId} and expires_at > CURRENT_DATE`;
    return match.rows[0];
  } catch (error) {
    console.error("Failed to fetch active match:", error);
    throw new Error("Failed to fetch active match.");
  }
}
