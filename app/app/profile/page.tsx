import { getProfile, getUser } from "@/app/lib/actions";
import ProfilePage from "./profile";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  const user = await getUser(session?.user?.email as string);
  const profile = await getProfile(user?.id as string);

  return (
    <main>
      <ProfilePage user={user} profile={profile} />
    </main>
  );
}
