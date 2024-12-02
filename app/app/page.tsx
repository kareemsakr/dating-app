"use client";

import { signOut } from "@/auth";
import Button from "../ui/Button";

export default function MainPage() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="text-2xl font-bold">Main Page</h1>
      <p>Welcome to the main page of the dating app!</p>
      {/* <Button onClick={() => signOut()}>Sign Out</Button> */}
    </main>
  );
}