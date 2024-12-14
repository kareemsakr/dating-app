"use client";
import { useActionState } from "react";
import { RequestMatch } from "../lib/actions";
import Button from "../ui/Button";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/16/solid";

export function UserHomePage() {
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
