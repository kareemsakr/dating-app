"use client";
import { PowerIcon } from "@heroicons/react/16/solid";
import { logout } from "@/app/lib/actions";
import Button from "@/app/ui/Button";

export default function LogoutButton() {
  return (
    <Button variant="hollow" onClick={async () => await logout()}>
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </Button>
  );
}
