export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  birthdate: Date;
  gender: Gender;
  is_admin?: boolean;
};

export type Profile = {
  userId: string;
  bio: string;
  looking_for: string;
  interests: string;
  non_negotiables: string;
  location: string;
  avatar_url: string;
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type MatchRequest = {
  user_id: string;
  status: string;
  notes: string;
  createdAt: Date;
};

export type Match = {
  user1_id: string;
  user2_id: string;
  matchMakerId: string;
  createdAt: Date;
  expiresAt: Date;
};

export type matchResultSearchResult = {
  id: string;
  user_id: string;
  created_at: Date;
  status: string;
  notes: string;
  is_active: boolean;
  name: string;
  birthdate: Date;
  gender: Gender;
  location: string;
  avatar_url: string;
  bio: string;
  looking_for: string;
  interests: string;
  non_negotiables: string;
};
