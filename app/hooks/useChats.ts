import { useState, useEffect } from "react";
import { chatService } from "@/app/lib/chat";
import { Message } from "@/app/lib/definitions";

export function useChat(currentUserId: string, recipientId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const chatId = chatService.getChatId(currentUserId, recipientId);

    const unsubscribe: () => void = chatService.subscribeToMessages(
      chatId,
      (newMessages: Message[]): void => {
        setMessages(newMessages);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currentUserId, recipientId]);

  const sendMessage = async (content: string) => {
    try {
      await chatService.sendMessage({
        content,
        fromId: currentUserId,
        toId: recipientId,
        read: false,
      });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
      return false;
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
  };
}
