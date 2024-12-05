"use client";

import React, { useActionState } from "react";
import styles from "../layout.module.css";
import Button from "../../ui/Button";
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { SIGNUP_URL } from "@/app/lib/constants";
import { authenticate } from "@/app/lib/actions";

const LoginPage = () => {
  const [data, formAction, isPending] = useActionState(authenticate, undefined);
  return (
    <>
      <h1 className={styles.title}>Login</h1>
      <form action={formAction} className={styles.form}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          defaultValue={data?.fieldData.email}
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
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {data?.errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{data?.errorMessage}</p>
            </>
          )}
        </div>
        <Button type="submit" variant="primary" aria-disabled={isPending}>
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
