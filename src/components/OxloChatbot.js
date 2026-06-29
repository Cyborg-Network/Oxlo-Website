import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

// ─── Simple markdown-to-HTML renderer ───
function renderMarkdown(text) {
  let html = text;

  // Escape HTML entities first
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Headers (### -> h4, ## -> h3)
  html = html.replace(/^### (.+)$/gm, '<strong class="oxchat-heading">$1</strong>');
  html = html.replace(/^## (.+)$/gm, '<strong class="oxchat-heading">$1</strong>');

  // Bold **text**
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic *text*
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Inline code `text`
  html = html.replace(/`([^`]+)`/g, '<code class="oxchat-code">$1</code>');

  // Markdown links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="oxchat-link">$1</a>');

  // Unordered list items (- item)
  html = html.replace(/^- (.+)$/gm, '<span class="oxchat-li">• $1</span>');

  // Collapse consecutive newlines into a single break BEFORE converting
  html = html.replace(/\n{2,}/g, "\n");

  // Line breaks
  html = html.replace(/\n/g, "<br/>");

  return html;
}

// ─── Parse action buttons from bot response ───
function parseMessage(text) {
  const parts = [];
  const regex = /\[(ACTION|CALC_ACTION):([^\]|]+)(?:\|([^\]]+))?\]/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }

    const actionType = match[1];
    const label = match[2].trim();
    const url = match[3]?.trim();

    if (actionType === "ACTION" && url) {
      parts.push({ type: "action", label, url });
    } else if (actionType === "CALC_ACTION") {
      parts.push({ type: "calc_action", label });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", content: text.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: "text", content: text }];
}

// ─── Typing indicator ───
function TypingIndicator() {
  return (
    <div className="oxchat-typing">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

// ─── Bot Avatar ───
function BotAvatar() {
  return (
    <div className="oxchat-avatar">
      <img src="/favicon.ico" alt="Ox" width="20" height="20" style={{ borderRadius: '4px' }} />
    </div>
  );
}

// ─── Message bubble ───
function MessageBubble({ message, onCalcClick }) {
  const parts = parseMessage(message.content);

  return (
    <div className={`oxchat-msg ${message.role === "user" ? "oxchat-msg-user" : "oxchat-msg-bot"}`}>
      {message.role === "assistant" && <BotAvatar />}
      <div className="oxchat-bubble-content">
        {parts.map((part, i) => {
          if (part.type === "text") {
            const html = renderMarkdown(part.content);
            return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
          }
          if (part.type === "action") {
            return (
              <a
                key={i}
                href={part.url}
                target={part.url.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="oxchat-action-btn"
              >
                {part.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            );
          }
          if (part.type === "calc_action") {
            return (
              <button
                key={i}
                onClick={onCalcClick}
                className="oxchat-action-btn oxchat-calc-btn"
              >
                {part.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

// ─── Main chatbot component ───
export default function OxloChatbot() {
  // Restore state from sessionStorage on mount (persists across page navigations)
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Show tooltip after short delay (always, unless dismissed this session)
  useEffect(() => {
    if (!hydrated || isOpen || tooltipDismissed) return;
    const timer = setTimeout(() => setShowTooltip(true), 2000);
    return () => clearTimeout(timer);
  }, [hydrated, isOpen, tooltipDismissed]);

  // Hide tooltip when chat opens
  useEffect(() => {
    if (isOpen) setShowTooltip(false);
  }, [isOpen]);

  const dismissTooltip = useCallback(() => {
    setShowTooltip(false);
    setTooltipDismissed(true);
  }, []);

  const handleTooltipCalcClick = useCallback(() => {
    dismissTooltip();
    if (router.pathname === "/") {
      const el = document.getElementById("cost-calculator");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      router.push("/#cost-calculator");
    }
  }, [router, dismissTooltip]);

  const handleOpen = useCallback(async () => {
    dismissTooltip();
    setIsOpen(true);
    if (!hasGreeted) {
      setHasGreeted(true);
      setIsLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: "hi" }],
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setMessages([{ role: "assistant", content: data.reply }]);
        } else {
          setMessages([{
            role: "assistant",
            content: "Hey there! 👋 Welcome to Oxlo.ai — your go-to platform for AI inference with flat monthly pricing. I can help you explore our 35+ models, compare plans, or see how much you'd save.\n\n[CALC_ACTION:Try the Cost Calculator ✨]",
          }]);
        }
      } catch {
        setMessages([{
          role: "assistant",
          content: "Hey there! 👋 Welcome to Oxlo.ai! I can help you explore our models, pricing, and features. What would you like to know?\n\n[CALC_ACTION:Try the Cost Calculator ✨]",
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  }, [hasGreeted, dismissTooltip]);

  // Navigate to calculator
  const handleCalcClick = useCallback(() => {
    if (router.pathname === "/") {
      const el = document.getElementById("cost-calculator");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setIsOpen(false);
      }
    } else {
      router.push("/#cost-calculator");
      setIsOpen(false);
    }
  }, [router]);

  // Send message
  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const contextMessages = newMessages.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: contextMessages }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "I'm having trouble connecting right now. Please try again in a moment! 🔄" },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection issue — please check your internet and try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ─── Chat Panel ─── */}
      <div className={`oxchat-panel ${isOpen ? "oxchat-panel-open" : ""}`}>
        {/* Header */}
        <div className="oxchat-header">
          <div className="oxchat-header-left">
            <div className="oxchat-header-logo">
              <img src="/favicon.ico" alt="Oxlo" width="22" height="22" style={{ borderRadius: '4px' }} />
            </div>
            <div>
              <div className="oxchat-header-title">Ox Assistant</div>
              <div className="oxchat-header-status">
                <span className="oxchat-status-dot"></span>
                Online
              </div>
            </div>
          </div>
          <button className="oxchat-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="oxchat-messages">
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} onCalcClick={handleCalcClick} />
          ))}
          {isLoading && (
            <div className="oxchat-msg oxchat-msg-bot">
              <BotAvatar />
              <div className="oxchat-bubble-content">
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="oxchat-input-wrap">
          <input
            ref={inputRef}
            type="text"
            className="oxchat-input"
            placeholder="Ask about models, pricing, features..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            className="oxchat-send-btn"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="oxchat-footer">
          Powered by <a href="https://oxlo.ai" target="_blank" rel="noopener noreferrer">Oxlo.ai</a>
        </div>
      </div>

      {/* ─── Tooltip CTA ─── */}
      <div className={`oxbot-tooltip ${showTooltip && !isOpen ? "oxbot-tooltip-visible" : ""}`}>
        <button className="oxbot-tooltip-close" onClick={dismissTooltip} aria-label="Dismiss">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="oxbot-tooltip-header">
          <div className="oxbot-tooltip-avatar">
            <img src="/favicon.ico" alt="OxBot" width="18" height="18" />
          </div>
          <span className="oxbot-tooltip-name">OxBot</span>
        </div>
        <p className="oxbot-tooltip-text">
          Hi there! Try our cost calculator to see what you&apos;d save with Oxlo.ai.
        </p>
        <button className="oxbot-tooltip-cta" onClick={handleTooltipCalcClick}>
          Open calculator
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <div className="oxbot-tooltip-arrow" />
      </div>

      {/* ─── Floating Bubble ─── */}
      <button
        className={`oxchat-bubble ${isOpen ? "oxchat-bubble-hidden" : ""}`}
        onClick={handleOpen}
        aria-label="Open chat"
        id="oxlo-chatbot-trigger"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="oxchat-bubble-pulse"></span>
      </button>
    </>
  );
}
