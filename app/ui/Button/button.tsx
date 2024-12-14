import React from "react";
import styles from "./button.module.css";
import clsx from "clsx";

import { ButtonHTMLAttributes } from "react";

export default function Button({
  children,
  variant = "primary",
  full = false,
  large = false,
  medium = false,
  disabled = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: string;
  large?: boolean;
  medium?: boolean;
  disabled?: boolean;
  full?: boolean;
}) {
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
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabContainer({ children }: { children: React.ReactNode }) {
  return <div className={styles.tabContainer}>{children}</div>;
}
