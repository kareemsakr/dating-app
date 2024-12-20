import { getActiveMatch } from "@/app/lib/actions";
import { getUserProfile } from "@/app/lib/db";
import ChatScreen from "@/app/ui/ChatScreen";
import { auth } from "@/auth";

export default async function Page() {
  const { user } = (await auth()) || {};

  const match = await getActiveMatch(user.sub);
  const userProfile = await getUserProfile(user.sub);
  const matchedUserId = user.sub === match.user1 ? match.user2 : match.user1;
  const matchedUserProfile = await getUserProfile(matchedUserId);

  return (
    <ChatScreen
      userProfile={userProfile}
      matchProfile={matchedUserProfile}
      match={match}
    />
  );
}
