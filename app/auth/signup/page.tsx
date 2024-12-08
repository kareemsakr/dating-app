"use client";

import React, { useActionState } from "react";
import styles from "../layout.module.css";
import { getMinAllowedBdate } from "@/app/lib/utlis";
import { LOGIN_URL } from "@/app/lib/constants";
import Link from "next/link";
import Button from "@/app/ui/Button";
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/16/solid";
import { registerUser } from "@/app/lib/actions";

const SignUpPage = () => {
  const [data, formAction, isPending] = useActionState(registerUser, undefined);

  return (
    <>
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.form} action={formAction}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="John Doe"
          defaultValue={data?.fieldData?.name}
          className={styles.input}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          placeholder="youremail@domain.com"
          defaultValue={data?.fieldData?.email}
          className={styles.input}
        />
        <label htmlFor="birthdate">Birthday</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          placeholder={getMinAllowedBdate()}
          max={getMinAllowedBdate()}
          required
          defaultValue={data?.fieldData?.birthdate}
          className={styles.input}
        />
        <fieldset className="flex gap-2">
          <legend className="pb-3">Gender:</legend>

          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            required
            defaultChecked={data?.fieldData?.gender === "male"}
            className="radio radio-primary"
          />
          <label htmlFor="male" className="pr-3">
            Male
          </label>

          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            defaultChecked={data?.fieldData?.gender === "female"}
            className="radio radio-primary"
          />
          <label htmlFor="female" className="pr-3">
            Female
          </label>

          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            defaultChecked={data?.fieldData?.gender === "other"}
            className="radio radio-primary"
          />
          <label htmlFor="other" className="pr-3">
            Other
          </label>
        </fieldset>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          placeholder="********"
          className={styles.input}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          minLength={8}
          placeholder="********"
          className={styles.input}
        />
        <Button type="submit" variant="primary" aria-disabled={isPending}>
          Sign Up <ArrowRightIcon />
        </Button>
        <Link className={styles.sign_up_link} href={LOGIN_URL}>
          Already have an account? Login
        </Link>
        {!!data?.errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{data?.errorMessage}</p>
          </>
        )}
      </form>
    </>
  );
};

export default SignUpPage;
