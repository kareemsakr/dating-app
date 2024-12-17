"use client";
import { matchResultSearchResult } from "@/app/lib/definitions";
import { capitalize, getAge } from "@/app/lib/utlis";
import Button from "../Button";
import { TabContainer } from "../Button/button";
import { useRef, useState } from "react";

export default function MatchRequestSearch({
  matchRequests,
  handleSelectMatch,
}: {
  handleSelectMatch?: (match: matchResultSearchResult) => void;
  matchRequests: matchResultSearchResult[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedRequest, setSelectedRequest] =
    useState<matchResultSearchResult | null>(null);

  const handleViewProfile = (matchRequest: matchResultSearchResult) => {
    setSelectedRequest(matchRequest);
    dialogRef.current?.showModal();
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th className="hidden md:table-cell">Age/Gender</th>
            <th className="hidden md:table-cell">Request Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!matchRequests && (
            <tr>
              <td colSpan={3} className="text-center">
                No match requests found
              </td>
            </tr>
          )}
          {matchRequests?.map((matchRequest) => (
            <tr key={matchRequest.id} className="relative">
              <td>
                <article className="flex items-center gap-3">
                  <figure className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={matchRequest.avatar_url}
                        alt={`Profile picture of ${matchRequest.name}`}
                      />
                    </div>
                  </figure>
                  <section>
                    <h3 className="font-bold">{matchRequest.name}</h3>
                    <p className="text-sm opacity-50">
                      {matchRequest.location}
                    </p>
                  </section>
                </article>
              </td>
              <td className="hidden md:table-cell">
                <article className="flex gap-3">
                  <p>{getAge(matchRequest.birthdate)} y.o.</p>
                  <p className="badge badge-primary text-white">
                    {capitalize(matchRequest.gender)}
                  </p>
                </article>
              </td>
              <td className="hidden md:table-cell">
                <p>{new Date(matchRequest.created_at).toDateString()}</p>
              </td>
              <td>
                <TabContainer>
                  <Button
                    onClick={() => handleViewProfile(matchRequest)}
                    variant="hollow"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => {
                      handleSelectMatch
                        ? handleSelectMatch(matchRequest)
                        : null;
                    }}
                    variant="primary"
                  >
                    Select
                  </Button>
                </TabContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box card card-side  w-11/12 max-w-5xl p-0 bg-background shadow-custom">
          {selectedRequest && <ViewProfile matchRequest={selectedRequest} />}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => setSelectedRequest(null)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

function ViewProfile({
  matchRequest,
}: {
  matchRequest: matchResultSearchResult;
}) {
  return (
    <>
      <figure className="w-0 md:w-1/3">
        <img
          className="h-full"
          src={matchRequest.avatar_url}
          alt="profile picture"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title md:text-3xl">
          {matchRequest.name}
          <span className="text-sm opacity-50 self-center">
            {matchRequest.location}
          </span>
        </h2>
        <section className="flex gap-3 items-center mb-6">
          <span>{getAge(matchRequest.birthdate)} y.o.</span>
          <span className="badge badge-primary text-white">
            {capitalize(matchRequest.gender)}
          </span>
        </section>

        <dl>
          <div className="mb-7 border border-orangePeel rounded px-2 pt-3 pb-2 relative">
            <dt className="font-semibold absolute -top-3 bg-background px-2">
              Bio
            </dt>
            <dd className="opacity-55">{matchRequest.bio}</dd>
          </div>
          <div className="mb-7 border border-orangePeel rounded px-2 pt-3 pb-2 relative">
            <dt className="font-semibold absolute -top-3 bg-background px-2">
              Looking for
            </dt>
            <dd className="opacity-55">{matchRequest.looking_for}</dd>
          </div>
          <div className="mb-7 border border-orangePeel rounded px-2 pt-3 pb-2 relative">
            <dt className="font-semibold absolute -top-3 bg-background px-2">
              Interests
            </dt>
            <dd className="opacity-55">{matchRequest.interests}</dd>
          </div>
          <div className="mb-7 border border-orangePeel rounded px-2 pt-3 pb-2 relative">
            <dt className="font-semibold absolute -top-3 bg-background px-2">
              Non Negotiables
            </dt>
            <dd className="opacity-55">{matchRequest.non_negotiables}</dd>
          </div>
        </dl>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Select</button>
        </div>
      </div>
    </>
  );
}
