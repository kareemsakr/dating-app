"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import { matchResultSearchResult } from "@/app/lib/definitions";
import { getAge } from "@/app/lib/utlis";
import clsx from "clsx";
import { matchUsers } from "@/app/lib/actions";
export function MatchSelector({
  match1,
  match2,
  handleDeselectMatch,
}: {
  match1?: matchResultSearchResult;
  match2?: matchResultSearchResult;
  handleDeselectMatch?: (userId: string) => void;
}) {
  const handleMatch = async () => {
    try {
      if (!match1 || !match2) throw Error("Please select two users to match");
      const result = await matchUsers(match1, match2);
      handleDeselectMatch?.(match1.user_id);
      handleDeselectMatch?.(match2.user_id);
      //add this as a toast
      console.log(result);
      // Handle the result
    } catch (error) {
      console.error(error);
      // Handle any errors
    }
  };
  return (
    <section
      className={clsx(
        "flex flex-col items-center transition-all duration-500 ease max-h-0 opacity-0",
        (match1 || match2) && "max-h-[500px] opacity-100 mb-2 md:mb-16"
      )}
    >
      <ul className="flex items-center justify-center gap-2 md:gap-16 mb-4 md:mb-12">
        <User {...match1} removeMatch={handleDeselectMatch} />
        <li className="hidden md:block">
          {/* <p className="text-3xl">❤️</p> */}
          <PlusIcon className="w-12 h-12 text-red-500" />
        </li>
        <User {...match2} removeMatch={handleDeselectMatch} />
      </ul>
      <Button onClick={handleMatch}>Match ❤️</Button>
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
      <h3 className="text-xl font-semibold text-nowrap">{name}</h3>
      <p className="text-sm opacity-50 mb-2 ">{location}</p>
      <article className="flex gap-2 items-center">
        <p>{birthdate ? getAge(birthdate) : "??"} y.o.</p>
        <p className="badge badge-primary text-white font-bold">{gender}</p>
      </article>
    </li>
  );
};
