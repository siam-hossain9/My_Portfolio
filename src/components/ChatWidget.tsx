"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// `synthetic` marks client-generated text (errors, fallbacks) that must never
// be replayed to the model as real assistant history.
type Msg = { role: "user" | "assistant"; content: string; synthetic?: boolean };

const SUGGESTIONS = [
  "Who is Siam?",
  "What tech does he use?",
  "Tell me about his research",
  "How can I contact him?",
];

const GREETING =
  "Hi! I'm Siam's assistant 👋 Ask me anything about his skills, projects, research, or how to get in touch.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const reduce = useReducedMotion();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    // Autofocus only for keyboard/mouse users — on touch devices it would pop
    // the software keyboard over the panel the moment it opens.
    if (open && window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
  }, [open]);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    // Never replay synthesized error/fallback bubbles to the model.
    const history = [
      ...messages.filter((m) => !m.synthetic).map(({ role, content }) => ({ role, content })),
      { role: "user", content: question } as Msg,
    ];
    setMessages([...messages, { role: "user", content: question }, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    setAnnouncement("Assistant is typing");

    let acc = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const snapshot = acc;
        setMessages((cur) => {
          const copy = cur.slice();
          copy[copy.length - 1] = { role: "assistant", content: snapshot };
          return copy;
        });
      }

      if (!acc.trim()) {
        setMessages((cur) => {
          const copy = cur.slice();
          copy[copy.length - 1] = {
            role: "assistant",
            content: "Sorry, I didn't catch that — could you rephrase?",
            synthetic: true,
          };
          return copy;
        });
      }
      setAnnouncement(acc.trim() || "The assistant couldn't answer — try rephrasing.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "I couldn't respond right now.";
      setMessages((cur) => {
        const copy = cur.slice();
        if (acc.trim()) {
          // Keep the partial reply the visitor was already reading; append a note.
          copy[copy.length - 1] = { role: "assistant", content: acc };
          copy.push({ role: "assistant", content: `⚠️ ${message} The reply may be incomplete.`, synthetic: true });
        } else {
          copy[copy.length - 1] = { role: "assistant", content: `⚠️ ${message} Please try again.`, synthetic: true };
        }
        return copy;
      });
      setAnnouncement(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={open ? "Close chat" : "Open chat — ask about Siam"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg shadow-cyan-500/25 outline-none ring-cyan-400/50 transition-transform hover:scale-105 focus-visible:ring-2"
        style={{ background: "linear-gradient(135deg, #0a89b0, #14b8c6)" }}
        whileTap={reduce ? undefined : { scale: 0.92 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={reduce ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
            >
              <IconX />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={reduce ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
            >
              <IconChat />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Screen-reader announcements: one message per completed reply, not per token */}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Siam's assistant"
            onKeyDown={(e) => {
              if (e.key === "Escape") close();
            }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed bottom-24 right-5 z-[60] flex max-h-[70dvh] w-[min(92vw,22rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/95 text-neutral-100 shadow-2xl shadow-black/50 backdrop-blur"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ background: "linear-gradient(135deg, #0a89b0, #14b8c6)" }}>
                <IconSpark />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-neutral-950 bg-green-400" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Ask about Siam</p>
                <p className="truncate text-xs text-neutral-400">AI assistant · replies instantly</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close chat"
                className="ml-auto rounded-md p-1.5 text-neutral-400 outline-none transition-colors hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              >
                <IconX />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4">
              <Bubble role="assistant">{GREETING}</Bubble>

              {messages.map((m, i) => {
                const isStreamingPlaceholder =
                  loading && i === messages.length - 1 && m.role === "assistant" && m.content === "";
                return (
                  <Bubble key={i} role={m.role}>
                    {isStreamingPlaceholder ? (
                      <TypingDots />
                    ) : (
                      <>
                        {m.content}
                        {loading && i === messages.length - 1 && m.role === "assistant" && (
                          <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-cyan-300/80" />
                        )}
                      </>
                    )}
                  </Bubble>
                );
              })}

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1.5 text-xs text-cyan-200 outline-none transition-colors hover:bg-cyan-400/15 focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-white/10 p-2.5"
            >
              <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-cyan-400/40">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      // Don't send while an IME is composing (committing a
                      // candidate also fires Enter; keyCode 229 covers Safari).
                      if (e.nativeEvent.isComposing || e.keyCode === 229) return;
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask about Siam…"
                  aria-label="Type your question"
                  className="max-h-24 flex-1 resize-none bg-transparent text-sm text-neutral-100 outline-none placeholder:text-neutral-400"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-lg text-white outline-none transition-opacity disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                  style={{ background: "linear-gradient(135deg, #0a89b0, #14b8c6)" }}
                >
                  <IconSend />
                </button>
              </div>
              <p className="px-1 pt-1.5 text-center text-[10px] text-neutral-400">
                Answers about Siam · powered by NVIDIA NIM
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: ReactNode }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-cyan-500/90 text-white"
            : "rounded-bl-sm border border-white/10 bg-white/5 text-neutral-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex gap-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

/* ── Inline icons (no icon-library dependency) ── */
function IconChat() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.9L3 21l1.9-5.6a8.5 8.5 0 0 1-.9-3.9A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
    </svg>
  );
}
function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
function IconSend() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.9 5.8L20 9.7l-5.1 3.4L16.5 19 12 15.4 7.5 19l1.6-5.9L4 9.7l6.1-1.9L12 2z" />
    </svg>
  );
}
