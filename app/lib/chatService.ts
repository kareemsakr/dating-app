// lib/chat-service.ts
import { Message } from "./definitions";
import { db } from "./firebase";
import { ref, onValue, push, serverTimestamp } from "firebase/database";

export const chatService = {
  getChatId: (userId1: string, userId2: string) => {
    return [userId1, userId2].sort().join("_");
  },

  sendMessage: async (message: Omit<Message, "timestamp">) => {
    const chatId = chatService.getChatId(message.fromId, message.toId);
    const chatRef = ref(db, `chats/${chatId}/messages`);

    return push(chatRef, {
      ...message,
      timestamp: serverTimestamp(),
    });
  },

  subscribeToChat: (
    chatId: string,
    callback: (messages: Message[]) => void
  ) => {
    const chatRef = ref(db, `chats/${chatId}/messages`);

    return onValue(chatRef, (snapshot) => {
      const messages: Message[] = [];
      snapshot.forEach((child) => {
        messages.push({
          id: child.key!,
          ...child.val(),
        });
      });
      callback(messages);
    });
  },
};
