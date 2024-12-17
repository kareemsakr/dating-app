"use client";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import { matchResultSearchResult } from "@/app/lib/definitions";
import { getAge } from "@/app/lib/utlis";
export function MatchSelector({
  match1,
  match2,
  handleDeselectMatch,
}: {
  match1?: matchResultSearchResult;
  match2?: matchResultSearchResult;
  handleDeselectMatch?: (userId: string) => void;
}) {
  return (
    <section className="flex flex-col items-center mb-2 md:mb-16">
      <ul className="flex items-center justify-center gap-2 md:gap-16 mb-4 md:mb-12">
        <User {...match1} removeMatch={handleDeselectMatch} />
        <li className="hidden md:block">
          {/* <p className="text-3xl">❤️</p> */}
          <PlusIcon className="w-12 h-12 text-red-500" />
        </li>
        <User {...match2} removeMatch={handleDeselectMatch} />
      </ul>
      <Button>Match ❤️</Button>
    </section>
  );
}

const User = ({
  name = "?",
  birthdate = undefined,
  location = "Earth, Milkyway",
  avatar_url = "/avatar.png",
  gender = "⚥",
  user_id = "",
  removeMatch,
}: {
  name?: string;
  birthdate?: Date;
  location?: string;
  avatar_url?: string;
  gender?: string;
  user_id?: string;
  removeMatch?: (match: string) => void;
}) => {
  return (
    <li className="avatar flex flex-col items-center rounded px-4 py-3 shadow-custom max-w-40	">
      {user_id && (
        <button
          onClick={() => {
            if (removeMatch && user_id) {
              console.log("remove match", user_id);

              removeMatch(user_id);
            }
          }}
          className="btn btn-sm btn-circle btn-ghost absolute right-50% -top-8"
        >
          ✕
        </button>
      )}

      <div className="w-32 rounded mb-2">
        <img src={avatar_url} />
      </div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-sm opacity-50 mb-2 ">{location}</p>
      <article className="flex gap-2 items-center">
        <p>{birthdate ? getAge(birthdate) : "??"} y.o.</p>
        <p className="badge badge-primary text-white font-bold">{gender}</p>
      </article>
    </li>
  );
};
