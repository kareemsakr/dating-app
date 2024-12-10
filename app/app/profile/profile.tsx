"use client";
import { useActionState, useState, useRef, useEffect } from "react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [data, formAction, isPending] = useActionState(
    updateProfile,
    profile ? { fieldData: profile, errorMessage: undefined } : undefined
  );

  const [imagePreview, setImagePreview] = useState<string | null>(
    profile?.avatar_url || null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a temporary URL for the selected image
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // Clean up the temporary URL when component unmounts
    return () => URL.revokeObjectURL(previewUrl);
  };

  useEffect(() => {
    if (!isPending && data) {
      setIsEditing(false);
      if (data.fieldData?.avatar_url) {
        setImagePreview(data.fieldData.avatar_url);
      }
    }
  }, [isPending, data]);

  return (
    <article className="p-6">
      <form action={formAction} className="flex flex-col gap-3">
        <figure className="flex flex-col items-center mb-5">
          <div className="avatar w-24 h-24 md:w-32 md:h-32 lg:w-64 lg:h-64 relative">
            <img
              className="rounded-full"
              src={imagePreview || "/avatar.png"}
              alt="Profile picture"
            />
            {isEditing && (
              <>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  className="hidden"
                  // required
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <PencilSquareIcon
                  className="size-6 self-end absolute right-0 bottom-0 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                />
              </>
            )}
          </div>
          <figcaption className="flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-semibold">{user?.name}</h1>
            <div className="flex gap-3 items-center">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="input input-bordered input-primary w-full max-w-xs h-7"
                    defaultValue={data?.fieldData?.location}
                    required
                  />
                </>
              ) : (
                <p className="badge badge-primary text-white">
                  {data?.fieldData?.location || "Earth, The Milky Way"}
                </p>
              )}
            </div>
          </figcaption>
        </figure>
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
          htmlFor="looking_for"
          className="text-2xl md:text-3xl font-medium"
        >
          Looking for
        </label>
        <textarea
          id="looking_for"
          name="looking_for"
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
          htmlFor="non_negotiables"
          className="text-2xl md:text-3xl font-medium"
        >
          3 Non-negotiables
        </label>
        <input
          type="text"
          id="non_negotiables"
          name="non_negotiables"
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
