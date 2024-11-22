"use client";

import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react";
import { Bot, SendHorizonal, Trash, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface AIChatBoxProps {
  open: boolean;
  onClosed: () => void;
}

export default function AIChatBox({ open, onClosed }: AIChatBoxProps) {
  const {
    messages,
    isLoading,
    input,
    handleInputChange,
    handleSubmit,
    error,
    setMessages,
  } = useChat();

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={cn(
        "bottom-0 right-0 z-50 w-full max-w-[500px] p-1 shadow-lg lg:right-36",
        open ? "fixed" : "hidden",
      )}
    >
      <button onClick={onClosed} className="mb-1 ms-auto block">
        <XCircle size={30} className="rounded bg-background" />
      </button>
      <div className="shadow-lx flex h-[500px] flex-col rounded-lg border bg-background">
        <div className="mt-3 h-full overflow-y-auto  px-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}

          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                id: "loading",
                role: "assistant",
                content: "Thinking....",
              }}
            />
          )}

          {error && (
            <ChatMessage
              message={{
                id: "error",
                role: "assistant",
                content: "Something went wrong, please try again later",
              }}
            />
          )}

          {!error && messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <Bot size={28} />
              <p className="text-lg font-medium">
                Start a conversation with Virtual Me!
              </p>
              <p>
                Feel free to ask about my experience and projects in AI/ML, Data
                Science, and Data Analysis. For example:
              </p>
              <ul className="mx-10 mt-3 list-inside list-disc text-start font-medium">
                <li>"What are your previous experiences in AI/ML?"</li>
                <li>
                  "Can you explain a data analysis project you've worked on?"
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                DM on WhatsApp for Collaborations & Gigs{" "}
                <a
                  href="https://github.com/KofiAnaan0/portfolio"
                  className="text-primary hover:underline"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <button
            className="flex flex-none items-center justify-center"
            title="clear chat"
            type="button"
            onClick={() => setMessages}
          >
            <Trash size={24} />
          </button>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a question...."
            className="grow rounded border bg-background px-3 py-2"
            ref={inputRef}
          />
          <button
            type="submit"
            title="sumbit message"
            className="flex flex-none items-center justify-center disabled:opacity-50"
            disabled={isLoading || input.length === 0}
          >
            <SendHorizonal size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}

interface ChatMessageProp {
  message: Message;
}

function ChatMessage({ message: { role, content } }: ChatMessageProp) {
  const isAIMessage = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAIMessage ? "ms-3 justify-start" : "ms-3 justify-end",
      )}
    >
      {isAIMessage && <Bot className="mr-2 flex-none" />}
      <div
        className={cn(
          "rounded-md border px-3 py-2",
          isAIMessage ? "bg-background" : "bg-foreground text-background",
        )}
      >
        <ReactMarkdown
          components={{
            a: ({ node, ref, ...props }) => (
              <Link
                {...props}
                href={props.href ?? ""}
                className="text-primary hover:underline"
              />
            ),

            p: ({ node, ...props }) => (
              <p {...props} className="mt-3 first:mt-0" />
            ),

            ul: ({ node, ...props }) => (
              <ul
                {...props}
                className="mt-3 list-inside list-disc first:mt-0"
              />
            ),

            li: ({ node, ...props }) => <li {...props} className="mt-1" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
