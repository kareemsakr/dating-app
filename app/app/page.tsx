"use client";
import { logout } from "@/app/lib/actions";
import Button from "../ui/Button";
import { PowerIcon } from "@heroicons/react/16/solid";

export default function MainPage() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="text-2xl font-bold">Main Page</h1>
      <p>Welcome to the main page of the dating app!</p>
      <Button variant="hollow" onClick={async () => await logout()}>
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Sign Out</div>
      </Button>
    </main>
  );
}
