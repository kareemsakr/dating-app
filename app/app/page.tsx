import { auth } from "@/auth";
import { AdminPanel } from "./admin";
import { UserHomePage } from "./user";

export default async function MainPage() {
  const { user } = (await auth()) || {};
  return (
    <main className="min-h-screen p-4">
      {user.isAdmin ? <AdminPanel /> : <UserHomePage />}
    </main>
  );
}
