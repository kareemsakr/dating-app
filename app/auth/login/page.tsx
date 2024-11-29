"use client";

import React from "react";
import styles from "../layout.module.css";
import Button from "../../ui/Button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { SIGNUP_URL } from "@/app/lib/constants";

const LoginPage = () => {
  return (
    <>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} action="/login" method="post">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          placeholder="youremail@domain.com"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          placeholder="********"
        />
        <Button type="submit" variant="primary">
          Login <ArrowRightIcon />
        </Button>
        <Link className={styles.sign_up_link} href={SIGNUP_URL}>
          Don&apos;t have an account? Sign up
        </Link>
      </form>
    </>
  );
};

export default LoginPage;
