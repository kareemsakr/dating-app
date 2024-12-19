import { useState, useEffect } from "react";
import { initializeDatabase } from "@/app/lib/firebase";
import { chatService } from "@/app/lib/chatService";
import { Message } from "@/app/lib/definitions";

export function useChat(currentUserId: string, recipientId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Handle Firebase initialization and chat subscription
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initializeChat = async () => {
      try {
        // Initialize Firebase with custom token
        const initialized = await initializeDatabase();
        if (!initialized) {
          throw new Error("Failed to initialize Firebase");
        }

        setIsInitialized(true);

        // Subscribe to chat messages
        const chatId = chatService.getChatId(currentUserId, recipientId);
        unsubscribe = chatService.subscribeToChat(chatId, (newMessages) => {
          setMessages(newMessages);
          setLoading(false);
        });
      } catch (err) {
        console.error("Chat initialization error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to initialize chat"
        );
        setLoading(false);
      }
    };

    initializeChat();

    // Cleanup subscription when component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUserId, recipientId]);

  // Function to send a new message
  const sendMessage = async (content: string): Promise<boolean> => {
    if (!isInitialized) {
      setError("Chat not initialized");
      return false;
    }

    try {
      await chatService.sendMessage({
        content,
        fromId: currentUserId,
        toId: recipientId,
      } as Message);
      return true;
    } catch (err) {
      console.error("Send message error:", err);
      setError(err instanceof Error ? err.message : "Failed to send message");
      return false;
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    isInitialized,
  };
}
