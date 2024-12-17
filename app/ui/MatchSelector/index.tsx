"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
export function MatchSelector() {
  return (
    <section className="flex flex-col items-center mb-16">
      <ul className="flex items-center justify-center gap-16 mb-12">
        <li className="avatar flex flex-col items-center rounded shadow-xl px-4 py-3">
          <div className="w-32 rounded mb-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
          <h3 className="text-xl font-semibold">Kareem Sakr</h3>
          <p className="text-sm opacity-50 mb-2 ">Toronto, CA</p>
          <article className="flex gap-2 items-center">
            <p>18 y.o.</p>
            <p className="badge badge-primary text-white">Male</p>
          </article>
        </li>
        <li>
          {/* <p className="text-3xl">❤️</p> */}
          <PlusIcon className="w-12 h-12 text-red-500" />
        </li>
        <User />
      </ul>
      <Button>Match ❤️</Button>
    </section>
  );
}

const User = ({
  name = "?",
  age = "??",
  location = "Earth, Milkyway",
  avatar_url = "/avatar.png",
  gender = "⚥",
}) => {
  return (
    <li className="avatar flex flex-col items-center rounded px-4 py-3 shadow-custom">
      <div className="w-32 rounded mb-2">
        <img src={avatar_url} />
      </div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-sm opacity-50 mb-2 ">{location}</p>
      <article className="flex gap-2 items-center">
        <p>{age} y.o.</p>
        <p className="badge badge-primary text-white font-bold">{gender}</p>
      </article>
    </li>
  );
};
