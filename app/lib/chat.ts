import { db } from "@/app/lib/firebase";
import { Message } from "@/app/lib/definitions";
import {
  ref,
  push,
  onValue,
  off,
  query,
  orderByChild,
  limitToLast,
  update,
} from "firebase/database";

export const chatService = {
  // Generate a unique chat ID for two users
  getChatId: (userId1: string, userId2: string) => {
    return [userId1, userId2].sort().join("_");
  },

  // Send a message
  sendMessage: async (message: Omit<Message, "id" | "timestamp">) => {
    const chatId = chatService.getChatId(message.fromId, message.toId);
    const messagesRef = ref(db, `chats/${chatId}/messages`);

    return push(messagesRef, {
      ...message,
      timestamp: Date.now(),
    });
  },

  // Listen to new messages
  subscribeToMessages: (
    chatId: string,
    callback: (messages: Message[]) => void
  ) => {
    const messagesRef = query(
      ref(db, `chats/${chatId}/messages`),
      orderByChild("timestamp"),
      limitToLast(50)
    );

    onValue(messagesRef, (snapshot) => {
      const messages: Message[] = [];
      snapshot.forEach((childSnapshot) => {
        messages.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      callback(messages);
    });

    // Return unsubscribe function
    return () => off(messagesRef);
  },
};
