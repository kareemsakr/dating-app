import { signOut } from "@/auth";
import Button from "../ui/Button";
import { PowerIcon } from "@heroicons/react/16/solid";

export default function MainPage() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="text-2xl font-bold">Main Page</h1>
      <p>Welcome to the main page of the dating app!</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant="hollow">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </Button>
      </form>
    </main>
  );
}
