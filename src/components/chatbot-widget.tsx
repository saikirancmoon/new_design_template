"use client";

import { FormEvent, KeyboardEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  status?: "streaming" | "error" | "done";
};

type LeadDetails = {
  studentName: string;
  className: string;
  city: string;
  parentContact: string;
};

const CHAT_STORAGE_KEY = "sri-chaitanya-chat-history";
const LEAD_STORAGE_KEY = "sri-chaitanya-chat-lead";

const quickActions = ["Admissions", "Courses", "Hostel", "Transport", "Fee Details", "Branches Near Me", "Contact Support"];

function createTimestamp() {
  return Date.now();
}

function createId() {
  return `${createTimestamp()}-${Math.random().toString(36).slice(2)}`;
}

function createWelcomeMessage(): Message {
  return {
    id: "welcome",
    role: "assistant",
    content:
      "Hello 👋\n\nWelcome to Sri Chaitanya.\n\nI can help with:\n- Admissions\n- Courses\n- Branches\n- Hostel Facilities\n- Fee Information\n- Student Support\n\nHow may I assist you today?",
    timestamp: createTimestamp(),
    status: "done",
  };
}

function emptyLead(): LeadDetails {
  return { studentName: "", className: "", city: "", parentContact: "" };
}

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);
}

function isAdmissionInterest(message: string) {
  return /\b(admission|admissions|join|enroll|apply|seat|callback|counsell?ing|visit campus)\b/i.test(message);
}

function linkifyText(text: string) {
  const parts = text.split(/(support@srichaitanya\.net|040-44600600|69106666 Ext\. 401\/402)/g);

  return parts.map((part, index) => {
    if (part === "support@srichaitanya.net") {
      return (
        <a key={`${part}-${index}`} href="mailto:support@srichaitanya.net" className="font-bold text-[#C97B63] underline underline-offset-2">
          {part}
        </a>
      );
    }

    if (part === "040-44600600") {
      return (
        <a key={`${part}-${index}`} href="tel:04044600600" className="font-bold text-[#C97B63] underline underline-offset-2">
          {part}
        </a>
      );
    }

    if (part === "69106666 Ext. 401/402") {
      return (
        <a key={`${part}-${index}`} href="tel:69106666" className="font-bold text-[#C97B63] underline underline-offset-2">
          {part}
        </a>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function renderRichMessage(content: string) {
  const lines = content.replace(/\*\*/g, "").split("\n");
  const elements: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (!listItems.length) return;
    const items = listItems;
    listItems = [];
    elements.push(
      <ul key={`list-${elements.length}`} className="my-2 space-y-1 pl-4">
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className="list-disc">
            {linkifyText(item)}
          </li>
        ))}
      </ul>,
    );
  };

  lines.forEach((line, index) => {
    const cleanLine = line.trimEnd();
    if (/^[-•]\s+/.test(cleanLine)) {
      listItems.push(cleanLine.replace(/^[-•]\s+/, ""));
      return;
    }

    flushList();
    if (!cleanLine.trim()) {
      elements.push(<div key={`space-${index}`} className="h-2" />);
      return;
    }

    elements.push(
      <p key={`${cleanLine}-${index}`} className="my-1">
        {linkifyText(cleanLine)}
      </p>,
    );
  });

  flushList();
  return elements;
}

async function readTextStream(response: Response, onText: (text: string) => void) {
  if (!response.body) throw new Error("Response stream is unavailable.");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    text = `${text}${decoder.decode(value, { stream: true })}`;
    onText(text);
  }

  return text;
}

async function readResponseMessage(response: Response) {
  try {
    return (await response.text()).trim();
  } catch {
    return "";
  }
}

function loadStoredMessages() {
  try {
    const stored = window.localStorage.getItem(CHAT_STORAGE_KEY);
    if (!stored) return [createWelcomeMessage()];
    const parsed = JSON.parse(stored) as Message[];
    if (!Array.isArray(parsed) || !parsed.length) return [createWelcomeMessage()];
    return parsed;
  } catch {
    return [createWelcomeMessage()];
  }
}

function loadStoredLead(): LeadDetails {
  try {
    const stored = window.localStorage.getItem(LEAD_STORAGE_KEY);
    if (!stored) return emptyLead();
    return { ...emptyLead(), ...(JSON.parse(stored) as Partial<LeadDetails>) };
  } catch {
    return emptyLead();
  }
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadDetails, setLeadDetails] = useState<LeadDetails>(emptyLead);
  const [hasMounted, setHasMounted] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef("");

  const canSaveLead = useMemo(
    () => Boolean(leadDetails.studentName.trim() && leadDetails.className.trim() && leadDetails.city.trim() && leadDetails.parentContact.trim()),
    [leadDetails],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMessages(loadStoredMessages());
      setLeadDetails(loadStoredLead());
      setHasMounted(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages.slice(-40)));
  }, [hasMounted, messages]);

  useEffect(() => {
    if (!hasMounted) return;
    window.localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(leadDetails));
  }, [hasMounted, leadDetails]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen, showLeadCapture]);

  function handleScroll() {
    const list = listRef.current;
    if (!list) return;
    setShowScrollButton(list.scrollHeight - list.scrollTop - list.clientHeight > 120);
  }

  function scrollToBottom() {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }

  async function sendMessage(nextMessage = input) {
    const trimmed = nextMessage.trim();
    if (!trimmed || isLoading) return;

    lastUserMessageRef.current = trimmed;
    setInput("");
    setIsLoading(true);
    if (isAdmissionInterest(trimmed)) setShowLeadCapture(true);

    const timestamp = createTimestamp();
    const userMessage: Message = { id: createId(), role: "user", content: trimmed, timestamp, status: "done" };
    const assistantId = createId();
    const assistantMessage: Message = { id: assistantId, role: "assistant", content: "", timestamp, status: "streaming" };
    const history = messages
      .filter((message) => message.id !== "welcome")
      .map((message) => ({ role: message.role, content: message.content }));

    setMessages((current) => [...current, userMessage, assistantMessage]);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30_000);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);

      if (!response.ok) {
        const errorMessage = await readResponseMessage(response);
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content: errorMessage || "I’m having trouble connecting right now. Please try again.",
                  status: "error",
                }
              : message,
          ),
        );
        return;
      }

      const fullText = await readTextStream(response, (text) => {
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId ? { ...message, content: text, status: "streaming" } : message,
          ),
        );
      });

      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                content: fullText || "The exact details may vary by branch or academic year. Sri Chaitanya Support can confirm the latest information.",
                status: "done",
              }
            : message,
        ),
      );
    } catch {
      window.clearTimeout(timeout);
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                content: "I’m having trouble connecting right now. Please try again, and I’ll continue helping with your Sri Chaitanya question.",
                status: "error",
              }
            : message,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  function retryLastMessage() {
    const retryMessage = lastUserMessageRef.current;
    if (!retryMessage) return;
    setMessages((current) => current.filter((message) => message.status !== "error"));
    void sendMessage(retryMessage);
  }

  function saveLead() {
    if (!canSaveLead) return;
    window.localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(leadDetails));
    setShowLeadCapture(false);
    setMessages((current) => [
      ...current,
      {
        id: createId(),
        role: "assistant",
        content:
          "Thank you. I've saved these admission enquiry details for this demo session. A Sri Chaitanya counselor can use them to guide you on the right campus and program.",
        timestamp: createTimestamp(),
        status: "done",
      },
    ]);
  }

  function clearChat() {
    const welcome = createWelcomeMessage();
    setMessages([welcome]);
    window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify([welcome]));
  }

  return (
    <div className="fixed bottom-4 right-4 z-[70] font-sans text-[#0F2744] sm:bottom-5 sm:right-5">
      <AnimatePresence>
        {isOpen ? (
          <motion.section
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex h-[min(700px,calc(100svh-2rem))] w-[min(440px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[30px] border border-white/45 bg-[#F8F5EE]/92 shadow-[0_28px_110px_rgba(6,18,34,0.32)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#07182A]/94 dark:text-[#F8F5EE]"
            aria-label="Sri Chaitanya AI assistant"
          >
            <header className="bg-[#0F2744]/95 px-5 py-4 text-[#F8F5EE] backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.66rem] font-black uppercase tracking-[0.24em] text-[#D4A64A]">Admissions counselor</p>
                  <h2 className="mt-1 text-lg font-black">Sri Chaitanya AI</h2>
                  <p className="mt-1 text-xs text-[#F8F5EE]/62">Online now - Parent & student support</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={clearChat}
                    className="rounded-full border border-white/15 px-3 py-2 text-xs font-black text-white/75 transition hover:bg-white/10"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/10 text-lg font-bold transition hover:bg-white/18"
                    aria-label="Close chat"
                  >
                    x
                  </button>
                </div>
              </div>
            </header>

            <div ref={listRef} onScroll={handleScroll} className="relative flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.map((message) => (
                <motion.article
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={message.role === "user" ? "ml-auto max-w-[88%]" : "mr-auto max-w-[90%]"}
                >
                  <div
                    className={`break-words rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      message.role === "user"
                        ? "bg-[#0F2744] text-[#F8F5EE]"
                        : "border border-[#0F2744]/8 bg-white text-[#0F2744] dark:border-white/10 dark:bg-white/10 dark:text-[#F8F5EE]"
                    }`}
                  >
                    {message.content ? (
                      <div>{renderRichMessage(message.content)}</div>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-[#0F2744]/60 dark:text-[#F8F5EE]/70">
                        <span>Thinking</span>
                        <span className="inline-flex gap-1">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D4A64A]" />
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D4A64A] [animation-delay:120ms]" />
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D4A64A] [animation-delay:240ms]" />
                        </span>
                      </span>
                    )}
                    {message.status === "error" ? (
                      <button type="button" onClick={retryLastMessage} className="mt-3 block text-xs font-black text-[#C97B63]">
                        Retry
                      </button>
                    ) : null}
                  </div>
                  <p className={`mt-1 text-[0.68rem] text-[#0F2744]/38 dark:text-[#F8F5EE]/38 ${message.role === "user" ? "text-right" : "text-left"}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </motion.article>
              ))}

              {showLeadCapture ? (
                <div className="rounded-2xl border border-[#D4A64A]/35 bg-white p-4 shadow-sm dark:border-[#D4A64A]/25 dark:bg-white/10">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C97B63]">Admission enquiry</p>
                  <p className="mt-2 text-sm leading-6 text-[#0F2744]/70 dark:text-[#F8F5EE]/72">
                    Share a few details and I&apos;ll keep them ready for this demo session.
                  </p>
                  <div className="mt-3 grid gap-2">
                    {[
                      ["studentName", "Student name"],
                      ["className", "Class"],
                      ["city", "City"],
                      ["parentContact", "Parent contact number"],
                    ].map(([key, label]) => (
                      <input
                        key={key}
                        value={leadDetails[key as keyof LeadDetails]}
                        onChange={(event) => setLeadDetails((current) => ({ ...current, [key]: event.target.value }))}
                        placeholder={label}
                        className="rounded-xl border border-[#0F2744]/10 bg-[#F8F5EE] px-3 py-2 text-sm outline-none focus:border-[#D4A64A] dark:border-white/10 dark:bg-[#07182A] dark:text-[#F8F5EE]"
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={saveLead}
                      disabled={!canSaveLead}
                      className="rounded-xl bg-[#0F2744] px-4 py-2 text-xs font-black text-[#F8F5EE] disabled:opacity-45 dark:bg-[#D4A64A] dark:text-[#0F2744]"
                    >
                      Save details
                    </button>
                    <button type="button" onClick={() => setShowLeadCapture(false)} className="rounded-xl px-4 py-2 text-xs font-black text-[#0F2744]/58 dark:text-[#F8F5EE]/62">
                      Later
                    </button>
                  </div>
                </div>
              ) : null}

              <AnimatePresence>
                {showScrollButton ? (
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    type="button"
                    onClick={scrollToBottom}
                    className="sticky bottom-2 left-1/2 z-10 mx-auto block rounded-full border border-[#0F2744]/10 bg-white/90 px-3 py-1.5 text-xs font-black text-[#0F2744] shadow-lg backdrop-blur dark:border-white/10 dark:bg-[#0F2744]/90 dark:text-[#F8F5EE]"
                  >
                    New messages
                  </motion.button>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="border-t border-[#0F2744]/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {quickActions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => void sendMessage(question)}
                    disabled={isLoading}
                    className="shrink-0 rounded-full border border-[#0F2744]/10 bg-[#F8F5EE] px-3 py-1.5 text-xs font-bold text-[#0F2744]/72 transition hover:border-[#D4A64A] dark:border-white/10 dark:bg-white/10 dark:text-[#F8F5EE]/80"
                  >
                    {question}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  maxLength={1200}
                  rows={1}
                  placeholder="Ask about admissions, courses, branches..."
                  className="max-h-28 min-h-12 min-w-0 flex-1 resize-none rounded-2xl border border-[#0F2744]/10 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#0F2744]/38 focus:border-[#D4A64A] dark:border-white/10 dark:bg-[#07182A] dark:text-[#F8F5EE] dark:placeholder:text-[#F8F5EE]/38"
                  aria-label="Chat message"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-2xl bg-[#D4A64A] px-4 py-3 text-sm font-black text-[#0F2744] shadow-[0_14px_34px_rgba(212,166,74,0.22)] transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      {!isOpen ? (
        <motion.button
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 rounded-full border border-white/20 bg-[#0F2744]/95 px-4 py-3 text-sm font-black text-[#F8F5EE] shadow-[0_20px_70px_rgba(6,18,34,0.34)] backdrop-blur-xl"
          aria-label="Open Sri Chaitanya AI assistant"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#D4A64A] text-[#0F2744]">AI</span>
          Ask Sri Chaitanya
        </motion.button>
      ) : null}
    </div>
  );
}
