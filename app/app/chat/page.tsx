"use client";

import { useChat } from "@/app/hooks/useChat";
import { useEffect } from "react";

export default function Page() {
  const { messages, sendMessage } = useChat("currentUserId", "recipientId");

  useEffect(() => {
    if (messages.length > 0) {
      console.log("New messages:", messages);
    }

    sendMessage("Hello, world!");
  }, []);
  return <></>;
}
