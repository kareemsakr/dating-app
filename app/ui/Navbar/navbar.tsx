"use client";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import { APP_NAME } from "@/app/lib/constants";
import clsx from "clsx";
import Link from "next/link";

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
      <a href="/" className={styles.brand_button}>
        {APP_NAME}
      </a>
      <button className={clsx(styles.hamburger_menu)} onClick={toggleMenu}>
        <svg
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
        </svg>
      </button>
      {(isOpen || isClosing) && (
        <div className={clsx(styles.menu, { [styles.slide_out]: isClosing })}>
          <section className={styles.menu_navigation}>
            <Link href="/" className={styles.brand_button}>
              {APP_NAME}
            </Link>
            <button
              className={styles.closeButton}
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              &times;
            </button>
          </section>
          <ul className={styles.menu_button_list}>
            <li></li>
            <li></li>
          </ul>
        </div>
      )}

      <ul className={clsx(styles.desktop_menu)}>
        <li>
          <a href="/register">Create Account</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
