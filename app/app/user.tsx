"use client";
import { useActionState } from "react";
import { RequestMatch } from "../lib/actions";
import Button from "../ui/Button";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/16/solid";
import {
  Match,
  matchResultSearchResult,
  UserProfile,
} from "../lib/definitions";
import { capitalize, daysUntil, getAge } from "../lib/utlis";

export function UserHomePage({
  request,
  match,
  matchProfile,
}: {
  request?: matchResultSearchResult;
  match?: Match;
  matchProfile?: UserProfile;
}) {
  if (match && matchProfile) {
    return <ActiveMatch match={match} matchProfile={matchProfile} />;
  } else if (request) {
    return <RequestSubmitted />;
  } else {
    return <NoActiveRequest />;
  }
}

function RequestSubmitted() {
  return (
    <section className="flex flex-col items-center mt-16">
      <ul className="timeline timeline-vertical md:timeline-horizontal">
        <li>
          <div className="timeline-start timeline-box">Submit Request</div>
          <div className="timeline-middle">
            <CheckCircleIcon className="fill-primary" width={20} height={20} />
          </div>
          <hr className="bg-primary" />
        </li>
        <li>
          <hr className="bg-primary" />

          <div className="timeline-middle">
            <MagnifyingGlassCircleIcon
              className="fill-primary"
              width={20}
              height={20}
            />
          </div>
          <div className="timeline-end timeline-box">Reviewing Request</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start timeline-box">Receive Match</div>
          <div className="timeline-middle">
            <CheckCircleIcon width={20} height={20} />
          </div>
        </li>
      </ul>
    </section>
  );
}

function NoActiveRequest() {
  const [data, action, isPending] = useActionState(RequestMatch, undefined);

  return (
    <>
      <form action={action} className="flex flex-col items-start gap-2">
        <Button type="submit" disabled={!!isPending}>
          Request match
        </Button>
        {data?.status === "success" && (
          <div className="flex gap-1">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
            <p className="text-sm text-green-500">{data?.message}</p>
          </div>
        )}
        {data?.errorMessage && (
          <div className="flex gap-1">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{data?.errorMessage}</p>
          </div>
        )}
      </form>
    </>
  );
}

function ActiveMatch({
  match,
  matchProfile,
}: {
  match: Match;
  matchProfile: UserProfile;
}) {
  if (daysUntil(match.expires_at, new Date()) < 2 && matchProfile) {
    matchProfile.avatar_url = "/avatar.png";
  }
  return (
    <>
      <h1 className="text-center text-2xl">Meet Your Hanpicked Match</h1>
      <h2 className="text-center text-l">
        Review their profile then start chatting
      </h2>
      <p className="text-center text-l">
        Their profile pic is only visible after 5 days
      </p>

      <section className="card card-side  w-11/12 max-w-5xl p-0 bg-background shadow-custom mx-auto mt-8">
        <figure className="w-0 md:w-1/3">
          <img
            className="h-full"
            src={matchProfile.avatar_url}
            alt="profile picture"
          />
        </figure>

        <div className="card-body">
          <figure className="w-full md:w-0 md:h-0 avatar">
            <div className="mask mask-squircle h-24 w-24">
              <img
                className="h-full"
                src={matchProfile.avatar_url}
                alt="profile picture"
              />
            </div>
          </figure>
          <h2 className="card-title md:text-3xl flex flex-col md:block">
            {matchProfile.name}
            <span className="text-sm opacity-50 self-center md:ml-2">
              {matchProfile.location}
            </span>
          </h2>
          <section className="flex gap-3 items-center justify-center mb-6 md:justify-start">
            <span>{getAge(matchProfile.birthdate)} y.o.</span>
            <span className="badge badge-primary text-white">
              {capitalize(matchProfile.gender)}
            </span>
          </section>

          <dl>
            <div className="mb-7 border border-orangePeel rounded px-2 pt-3 pb-2 relative">
              <dt className="font-semibold absolute -top-3 bg-background px-2">
                Bio
              </dt>
              <dd className="opacity-55">{matchProfile.bio}</dd>
            </div>
            <div className="mb-7 border border-orangePeel rounded px-2 pt-3 pb-2 relative">
              <dt className="font-semibold absolute -top-3 bg-background px-2">
                Looking for
              </dt>
              <dd className="opacity-55">{matchProfile.looking_for}</dd>
            </div>
            <div className="mb-7 border border-orangePeel rounded px-2 pt-3 pb-2 relative">
              <dt className="font-semibold absolute -top-3 bg-background px-2">
                Interests
              </dt>
              <dd className="opacity-55">{matchProfile.interests}</dd>
            </div>
            <div className="mb-7 border border-orangePeel rounded px-2 pt-3 pb-2 relative">
              <dt className="font-semibold absolute -top-3 bg-background px-2">
                Non Negotiables
              </dt>
              <dd className="opacity-55">{matchProfile.non_negotiables}</dd>
            </div>
          </dl>
          <div className="card-actions justify-end">
            <button onClick={() => null} className="btn btn-primary text-white">
              Chat
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
