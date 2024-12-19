import { auth } from "@/auth";
import { AdminPanel } from "./admin";
import { UserHomePage } from "./user";
import {
  getActiveMatch,
  getMatchRequest,
  getUserProfile,
} from "@/app/lib/actions";

export default async function MainPage() {
  const { user } = (await auth()) || {};
  if (!user.isAdmin) {
    const request = await getMatchRequest(user.sub);
    const activeMatch = await getActiveMatch(user.sub);

    let profile2 = undefined;

    if (activeMatch) {
      const matchedUserId =
        user.sub === activeMatch.user1 ? activeMatch.user2 : activeMatch.user1;

      profile2 = await getUserProfile(matchedUserId);
    }

    return (
      <main className="min-h-screen p-4">
        <UserHomePage
          request={request}
          match={activeMatch}
          matchProfile={profile2}
        />
      </main>
    );
  }
  return (
    <main className="min-h-screen p-4">
      <AdminPanel />
    </main>
  );
}
