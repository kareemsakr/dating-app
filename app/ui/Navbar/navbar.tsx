"use client";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import { APP_NAME, LOGIN_URL, SIGNUP_URL } from "@/app/lib/constants";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleMenu = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 500); // Match the duration of the slide-out animation
    } else {
      setIsOpen(true);
    }
  };

  return (
    <nav className={styles.navbar}>
      <BrandButton />
      <button className={clsx(styles.hamburger_menu)} onClick={toggleMenu}>
        ☰
      </button>
      {(isOpen || isClosing) && (
        <div className={clsx(styles.menu, { [styles.slide_out]: isClosing })}>
          <header className={styles.menu_navigation}>
            <BrandButton />
            <button
              className={styles.closeButton}
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              &times;
            </button>
          </header>
          <MenuItems className={styles.menu_button_list} />
        </div>
      )}
      <MenuItems className={styles.desktop_menu} />
    </nav>
  );
};

const MenuItems = function ({ className }: { className: string }) {
  return (
    <ul className={className}>
      <li>
        <Link href="/about">Events</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li className={styles.spacer}></li>
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
    </ul>
  );
};

const BrandButton = function () {
  return (
    <Link href="/" className={styles.brand_button}>
      <Image src="/logo_hollow_nobg.svg" alt="logo" width={20} height={20} />
      {APP_NAME}
    </Link>
  );
};

export default Navbar;
