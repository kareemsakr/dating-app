"use client";

import { useChat } from "@/app/hooks/useChat";
import { useLayoutEffect, useEffect, useRef, useState } from "react";
import {
  InformationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { UserProfile } from "@/app/lib/definitions";
import { Match } from "@/app/lib/definitions";
import clsx from "clsx";

export default function Page({
  userProfile,
  matchProfile,
  match,
}: {
  userProfile: UserProfile;
  matchProfile: UserProfile;
  match: Match;
}) {
  const chatSectionRef = useRef<HTMLDivElement>(null);
  const { messages, loading, sendMessage } = useChat(
    match,
    userProfile.user_id,
    matchProfile.user_id
  );
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;

    await sendMessage(newMessage);
    setNewMessage("");
  };

  const handleKeypress = async (e: React.KeyboardEvent) => {
    //it triggers by pressing the enter key
    if (e.code === "13") {
      await handleSubmit();
    }
  };

  // Initial scroll without animation
  useLayoutEffect(() => {
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
    }
  }, []); // Empty dependency array for initial load only

  // For subsequent message updates, use the smooth scroll
  useEffect(() => {
    chatSectionRef.current?.scrollTo({
      top: chatSectionRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]); // When messages change

  return (
    <main className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-4.5rem)]">
      <article className="flex items-center border-y-2 p-4">
        <figure className="avatar pr-4">
          <div className="mask mask-circle h-12 w-12">
            <img
              src={matchProfile.avatar_url}
              alt={`Profile picture of ${matchProfile.name}`}
            />
          </div>
        </figure>
        <h2 className="font-semibold">{matchProfile.name}</h2>
        <InformationCircleIcon className="text-gray-600 h-8 w-8 ml-auto" />
      </article>
      <section ref={chatSectionRef} className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            className={clsx("chat text-wrap break-words	", [
              message.fromId === userProfile.user_id
                ? "chat-end"
                : "chat-start",
            ])}
            key={message.id}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={
                    message.fromId === userProfile.user_id
                      ? userProfile.avatar_url
                      : matchProfile.avatar_url
                  }
                />
              </div>
            </div>
            <div className="chat-bubble">
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </section>
      <form onSubmit={handleSubmit} className="relative p-4">
        <input
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={handleKeypress}
          value={newMessage}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full pr-12"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          disabled={loading}
        >
          <PaperAirplaneIcon className="w-12 h-12 p-3" />
        </button>
      </form>
    </main>
  );
}
