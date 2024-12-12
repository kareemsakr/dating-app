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
