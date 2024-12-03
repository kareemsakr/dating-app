"use client";

import clsx from "clsx";
import { useState } from "react";
import styles from "./navbar.module.css";
import BrandButton from "./brandButton";

export default function MobileNav({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <>
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
          {children}
        </div>
      )}
    </>
  );
}
