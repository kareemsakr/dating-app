"use client";
import React, { useState, cloneElement, ReactElement, ReactNode } from "react";
import { matchResultSearchResult } from "../lib/definitions";

export default function Wrapper({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [match1, setMatch1] = useState<matchResultSearchResult | null>(null);
  const [match2, setMatch2] = useState<matchResultSearchResult | null>(null);

  const handleSelectMatch = (match: matchResultSearchResult) => {
    if (match.user_id === match1?.user_id || match.user_id === match2?.user_id)
      return;
    if (!match1) {
      setMatch1(match);
    } else if (!match2) {
      setMatch2(match);
    } else {
      setMatch2(match);
    }
  };

  const handleDeselectMatch = (user_id: string) => {
    if (user_id === match1?.user_id) {
      setMatch1(null);
    } else if (user_id === match2?.user_id) {
      setMatch2(null);
    }
  };

  return (
    <>
      {React.Children.map(children, (child) =>
        cloneElement(child as ReactElement, {
          match1,
          match2,
          handleSelectMatch,
          handleDeselectMatch,
        })
      )}
    </>
  );
}
