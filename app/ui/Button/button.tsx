import React from "react";
import styles from "./button.module.css";
import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  full = false,
  large = false,
  medium = false,
  disabled = false,
  ...props
}: Readonly<{
  children: React.ReactNode;
  variant?: string;
  large?: boolean;
  medium?: boolean;
  disabled?: boolean;
  full?: boolean;
}>) {
  return (
    <button
      className={clsx(styles.button, {
        [styles.white]: variant == "white",
        [styles.primary]: variant == "primary",
        [styles.hollow]: variant == "hollow",
        [styles.black]: variant == "black",
        [styles.large]: large,
        [styles.medium]: medium,
        [styles.disabled]: disabled,
        [styles.full]: full,
      })}
      {...props}
    >
      {children}
    </button>
  );
}
