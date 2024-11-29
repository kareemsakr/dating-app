import React from "react";
import styles from "./layout.module.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.main}>
      <section className={styles.section}>{children}</section>
    </main>
  );
}
