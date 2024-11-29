"use client";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import { APP_NAME } from "@/app/lib/constants";
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
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-5 w-5 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg> */}
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
        <Button variant="primary" full>
          <Link href="/sign_up">Sign Up</Link>
        </Button>
      </li>
      <li>
        <Button variant="hollow" full>
          <Link href="/login">Login</Link>
        </Button>
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
