"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { getLocalAnswer } from "@/data/chatbotKB";

function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) return;
    let i = 0;
    const speed = Math.max(8, Math.min(20, 1500 / text.length));
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && <span className="inline-block w-1.5 h-4 bg-[var(--gold)] ml-0.5 animate-pulse align-text-bottom" />}
    </span>
  );
}

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{role: string, text: string, isNew?: boolean}[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last.isNew) {
        const timer = setTimeout(() => {
          setMessages(prev => prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, isNew: false } : m
          ));
        }, Math.max(2000, last.text.length * 15));
        return () => clearTimeout(timer);
      }
    }
  }, [messages]);

  async function handleAsk() {
    if (!question.trim()) return;

    const userMessage = { role: "user", text: question };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setQuestion("");
    setLoading(true);

    const localAnswer = getLocalAnswer(question);
    if (localAnswer) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", text: localAnswer, isNew: true }]);
        setLoading(false);
      }, 400 + Math.random() * 400);
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentMessages }),
      });

      const data = await res.json();
      const botText = data.answer || data.error || "No response received.";
      setMessages((prev) => [...prev, { role: "bot", text: botText, isNew: true }]);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Network error — please check your connection and try again.", isNew: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[70vh] w-full max-w-4xl mx-auto rounded-xl border border-[var(--border-gold)] bg-[var(--glass-base)] backdrop-blur-3xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.15)]">
      {}
      <div className="bg-[var(--glass-gold)] border-b border-[var(--border-gold)] px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-serif font-black text-[var(--gold2)] tracking-widest flex items-center gap-3">
          <Bot className="text-[var(--gold2)] w-6 h-6" /> TruthGuard AI Assist
        </h2>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-mono text-[var(--gold)] px-3 py-1 bg-[var(--glass-base)] border border-[var(--border-gold)] rounded-full">Online</span>
        </div>
      </div>

      {}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
           <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
              <Bot className="text-[var(--gold-dim)] w-16 h-16 opacity-50" />
              <p className="text-[var(--text-mid)] font-serif text-lg">I am the TruthGuard AI Assistant.<br/>Ask me anything about cybersecurity, fact-checking, digital safety, or platform features.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-lg">
                {["How do I fact-check a claim?", "What is phishing?", "How to report cybercrime?", "Tell me about deepfakes"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => { setQuestion(suggestion); }}
                    className="text-xs px-3 py-1.5 rounded-full border border-[var(--border-gold)] text-[var(--gold)] bg-[var(--glass-gold)] hover:bg-[var(--border-gold)] hover:text-[var(--bg)] transition-all cursor-pointer font-mono"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
           </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {}
              <div className="flex-shrink-0 mt-1">
                {msg.role === "user" ? (
                   <div className="w-8 h-8 rounded-full bg-[var(--glass-teal)] border border-[var(--border-teal)] flex items-center justify-center">
                     <User className="text-[var(--teal)] w-4 h-4" />
                   </div>
                ) : (
                   <div className="w-8 h-8 rounded-full bg-[var(--glass-gold)] border border-[var(--border-gold)] flex items-center justify-center">
                     <Bot className="text-[var(--gold)] w-4 h-4" />
                   </div>
                )}
              </div>
              
              {}
              <div
                className={`px-5 py-3 rounded-2xl align-top whitespace-pre-wrap font-sans text-[15px] leading-relaxed
                  ${msg.role === "user" 
                    ? "bg-[var(--glass-teal)] border border-[var(--border-teal)] text-white rounded-tr-none" 
                    : "bg-[var(--glass-base)] border border-[var(--border-gold)] text-[var(--text)] rounded-tl-none shadow-md"
                  }`}
              >
                {msg.role === "bot" && msg.isNew ? (
                  <TypingText text={msg.text} />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex w-full justify-start">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--glass-gold)] border border-[var(--border-gold)] flex items-center justify-center mt-1">
                <Bot className="text-[var(--gold)] w-4 h-4 animate-pulse" />
              </div>
              <div className="px-5 py-3 rounded-2xl rounded-tl-none bg-[var(--glass-base)] border border-[var(--border-gold)] text-[var(--gold)] font-mono text-sm flex items-center gap-3">
                <span className="flex gap-1">
                  <span className="w-2 h-2 bg-[var(--gold)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[var(--gold)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[var(--gold)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
                <span className="animate-pulse">Analyzing query...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {}
      <div className="p-4 bg-[var(--bg)] border-t border-[var(--border-gold)]">
        <div className="relative flex items-center w-full group">
          <input
            ref={inputRef}
            type="text"
            id="chat-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="Ask about cybersecurity, fact-checking, or digital safety..."
            className="flex-1 bg-[var(--bg2)] border border-[var(--border-dim)] text-[var(--text)] rounded-xl py-3 pl-4 pr-16 font-sans text-[15px] focus:outline-none focus:border-[var(--gold)] focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] transition-all placeholder-[var(--text-dim)] relative z-50 pointer-events-auto"
          />
          <button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className="absolute right-2 px-3 py-1.5 bg-[var(--glass-gold)] hover:bg-[var(--border-gold)] border border-[var(--border-gold)] text-[var(--gold)] rounded-lg transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
