import { Message } from "./definitions";
import { db } from "./firebase";
import { ref, onValue, push, serverTimestamp } from "firebase/database";

export const chatService = {
  sendMessage: async (chatId: string, message: Omit<Message, "timestamp">) => {
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
