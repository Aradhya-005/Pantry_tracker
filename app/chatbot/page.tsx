"use client";

import { Box, Stack } from "@mui/material";
import React, { useState, useRef, useEffect } from "react"; // Import React explicitly
import './chatbot.css';

interface Message {
  role: "assistant" | "user";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm the pantry tracker support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!message.trim()) return; // Don't send empty messages

    setMessage("");
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    try {
      setIsLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await response.text();

      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // Remove the last empty assistant message
        { role: "assistant", content: text },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // Remove the last empty assistant message
        {
          role: "assistant",
          content: "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => { // Use React.KeyboardEvent
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Use React.ChangeEvent
    setMessage(event.target.value);
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
    className="chatbox"
     
    >
      <Stack
       className="content-chatbox"
        p={2}
        spacing={3}
      >
        <Stack
          direction={"column"}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === "assistant" ? "flex-start" : "flex-end"}
            >
              <Box
                sx={{
                  bgcolor: message.role === "assistant" ? "#3498db" : "#2ecc71",
                  color: "white",
                  borderRadius: 3,
                  p: 2,
                }}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <input
            value={message}
            disabled={isLoading}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <button onClick={sendMessage} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </Stack>
        <div ref={messagesEndRef} />
      </Stack>
    </Box>
  );
}
