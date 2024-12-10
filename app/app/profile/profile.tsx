"use client";
import { useActionState, useState } from "react";
import {
  EllipsisVerticalIcon,
  ExclamationCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { updateProfile } from "@/app/lib/actions";
import { User, Profile } from "@/app/lib/definitions";
import Button from "@/app/ui/Button";

interface ProfilePageProps {
  user?: User;
  profile?: Profile;
}

export default function ProfilePage({ user, profile }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [data, formAction, isPending] = useActionState(
    updateProfile,
    profile ? { fieldData: profile, errorMessage: undefined } : undefined
  );

  return (
    <article className="p-6">
      <figure className="flex flex-col items-center mb-5">
        <div className="avatar w-24 h-24 md:w-32 md:h-32 lg:w-64 lg:h-64 relative">
          <img
            className="rounded-full"
            src={(data?.fieldData?.avatar_url as string) || "/avatar.png"}
            alt="Profile picture"
          />
          {isEditing && (
            <PencilSquareIcon className="size-6 self-end absolute right-0 bottom-0" />
          )}
        </div>
        <figcaption className="flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-semibold">{user?.name}</h1>
          <div className="flex gap-3 items-center">
            <p className="badge badge-primary text-white">
              {data?.fieldData?.location || "Earth, The Milky Way"}
            </p>
            {isEditing && <PencilSquareIcon className="size-6 self-end" />}
          </div>
        </figcaption>
      </figure>
      <form action={formAction} className="flex flex-col gap-3">
        <ul className="flex flex-row justify-between mb-5">
          {isEditing ? (
            <li className="flex gap-3">
              <Button type="submit" variant="primary" aria-disabled={isPending}>
                Save
              </Button>
              <Button
                variant="hollow"
                aria-disabled={isPending}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing((prev) => !prev);
                }}
              >
                Cancel
              </Button>
            </li>
          ) : (
            <li>
              <Button
                variant="hollow"
                aria-disabled={isPending}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing((prev) => !prev);
                }}
              >
                Edit profile
              </Button>
            </li>
          )}
          <li className="self-center">
            <EllipsisVerticalIcon className="size-6" />
          </li>
        </ul>

        {data?.errorMessage && (
          <div className="flex gap-1">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{data?.errorMessage}</p>
          </div>
        )}
        <label htmlFor="bio" className="text-2xl md:text-3xl font-medium">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          className="textarea textarea-primary min-h-32"
          placeholder="Tell us about yourself"
          disabled={!isEditing}
          required
          defaultValue={data?.fieldData?.bio}
        ></textarea>
        <label
          htmlFor="lookingFor"
          className="text-2xl md:text-3xl font-medium"
        >
          Looking for
        </label>
        <textarea
          id="lookingFor"
          name="lookingFor"
          className="textarea textarea-primary min-h-32"
          placeholder="What are you looking for in a relationship as well as a partner?"
          disabled={!isEditing}
          required
          defaultValue={data?.fieldData?.looking_for}
        ></textarea>
        <label htmlFor="interests" className="text-2xl md:text-3xl font-medium">
          3 Interests
        </label>
        <input
          id="interests"
          name="interests"
          type="text"
          placeholder="Your top 3 interests"
          className="input input-bordered input-primary w-full max-w-xs"
          required
          defaultValue={data?.fieldData?.interests}
          disabled={!isEditing}
        />
        <label
          htmlFor="nonNegotiables"
          className="text-2xl md:text-3xl font-medium"
        >
          3 Non-negotiables
        </label>
        <input
          type="text"
          id="nonNegotiables"
          name="nonNegotiables"
          placeholder="3 Things that are non negotiable for you"
          className="input input-bordered input-primary w-full max-w-xs"
          defaultValue={data?.fieldData?.non_negotiables}
          required
          disabled={!isEditing}
        />
      </form>
    </article>
  );
}
