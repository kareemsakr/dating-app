import React from "react";
import styles from "./navbar.module.css";
import { LOGIN_URL, SIGNUP_URL } from "@/app/lib/constants";
import Link from "next/link";
import Button from "../Button";
// import MobileNav from "./mobileNav";
import { auth } from "@/auth";
import BrandButton from "./brandButton";
import { ProfileMenu } from "./profileMenu";
// import clsx from "clsx";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className={styles.navbar}>
      <BrandButton />
      {/* <MobileNav>
        <MenuItems className={styles.menu_button_list} isLoggedIn={!!session} />
      </MobileNav> */}
      <MenuItems className={styles.desktop_menu} isLoggedIn={!!session} />
    </nav>
  );
};

const MenuItems = function ({
  className,
  isLoggedIn,
}: {
  className: string;
  isLoggedIn?: boolean;
}) {
  return (
    <ul className={className}>
      {/* <li>
        <Link href="/about">Events</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li> */}
      <li className={styles.spacer}></li>
      {isLoggedIn ? (
        <li>
          <ProfileMenu />
        </li>
      ) : (
        <>
          <li>
            <Link href={SIGNUP_URL}>
              <Button variant="primary" full>
                Sign Up
              </Button>
            </Link>
          </li>
          <li>
            <Link href={LOGIN_URL}>
              <Button variant="hollow" full>
                Login
              </Button>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default Navbar;
