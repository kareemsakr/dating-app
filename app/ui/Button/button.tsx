import React from "react";
import styles from "./button.module.css";
import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  ...props
}: Readonly<{
  children: React.ReactNode;
  variant?: string;
}>) {
  return (
    <button
      className={clsx(styles.button, {
        [styles.white]: variant == "white",
        [styles.primary]: variant == "primary",
        [styles.hollow]: variant == "hollow",
        [styles.black]: variant == "black",
      })}
      {...props}
    >
      {children}
    </button>
  );
}
