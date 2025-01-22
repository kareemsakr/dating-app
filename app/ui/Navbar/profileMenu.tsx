import Link from "next/link";
import LogoutButton from "./logoutButton";
import { HOME_URL, PROFILE_URL } from "@/app/lib/constants";
import { auth } from "@/auth";
import { getProfile } from "@/app/lib/actions";

export async function ProfileMenu() {
  const session = await auth();
  const user = session?.user;
  const profile = await getProfile(user?.sub);
  if (!user) {
    return null;
  }
  return (
    <>
      <details className="hidden relative md:block">
        <summary className="list-none">
          <div className="flex avatar online">
            <div className="w-14 rounded-full">
              <img src={profile?.avatar_url} />
            </div>
          </div>
        </summary>
        <ul className="p-6 absolute top-full right-0 z-10 w-72 drop-shadow-xl rounded bg-background shadow-custom">
          <MenuItems avatar_url={profile?.avatar_url} name={user?.name} />
        </ul>
      </details>
      <ul className="md:hidden">
        <MenuItems avatar_url={profile?.avatar_url} name={user?.name} />
      </ul>
    </>
  );
}

const MenuItems = ({
  avatar_url,
  name,
}: {
  avatar_url?: string;
  name?: string;
}) => {
  return (
    <>
      <li>
        <figure className="flex flex-col avatar items-center pb-6">
          <div className="w-14 rounded-full ">
            <img src={avatar_url} />
          </div>
          <figcaption>
            <h5 className="text-lg font-semibold">{name}</h5>
          </figcaption>
        </figure>
      </li>
      <li className="pb-2">
        <Link href={HOME_URL}>Home</Link>
      </li>
      <li>
        <Link href={PROFILE_URL}>Profile</Link>
      </li>
      <div className="divider"></div>
      <li>
        <LogoutButton />
      </li>
    </>
  );
};
