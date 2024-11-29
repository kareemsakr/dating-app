"use client";

import React from "react";
import styles from "../layout.module.css";
import { getMinAllowedBdate } from "@/app/lib/utlis";
import { LOGIN_URL } from "@/app/lib/constants";
import Link from "next/link";
import Button from "@/app/ui/Button";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

const SignUpPage = () => {
  return (
    <>
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.form} action="/signup" method="post">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="John Doe"
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          placeholder="youremail@domain.com"
        />
        <label htmlFor="birthdate">Birthday</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          placeholder={getMinAllowedBdate()}
          max={getMinAllowedBdate()}
          required
          onChange={(e) => {}}
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
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          minLength={8}
          placeholder="********"
        />
        <Button type="submit" variant="primary">
          Login <ArrowRightIcon />
        </Button>
        <Link className={styles.sign_up_link} href={LOGIN_URL}>
          Already have an account? Login
        </Link>
      </form>
    </>
  );
};

export default SignUpPage;