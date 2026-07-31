'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Stethoscope, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface ProductSnippet {
  name: string;
  slug: string;
  brand: string;
  category: string;
  description: string;
  specs: string[];
}

interface ChatResponse {
  reply: string;
  products: ProductSnippet[];
  suggestions: string[];
}

interface Message {
  role: 'user' | 'bot';
  text: string;
  products?: ProductSnippet[];
  suggestions?: string[];
}

const WELCOME: Message = {
  role: 'bot',
  text: 'Welcome to TriCore Surgical. I can help you explore our catalogue of surgical equipment and hospital furniture. Ask me about products, brands, or how to request a quotation.',
  suggestions: ['What products do you have?', 'Show me hospital beds', 'How do I request a quote?'],
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await api.post<ChatResponse>('/chat', { message: text.trim() });
      const botMsg: Message = {
        role: 'bot',
        text: data.reply,
        products: data.products?.length ? data.products : undefined,
        suggestions: data.suggestions,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, I could not process that. Please try again or use the contact form for assistance.', suggestions: ['Browse products', 'Contact TriCore'] }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-[400px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl sm:bottom-24 sm:right-8" style={{ height: 'min(540px, 75vh)' }}>
          <div className="flex items-center justify-between bg-navy px-5 py-3.5 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <Stethoscope size={16} />
              </div>
              <div>
                <p className="text-sm font-bold leading-none">TriCore Assistant</p>
                <p className="mt-0.5 text-[0.65rem] leading-none text-slate-300">Product guidance</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-md p-1.5 text-white/70 transition-colors hover:text-white" aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-offwhite">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'rounded-2xl rounded-br-md bg-steel px-4 py-2.5 text-sm text-white' : 'rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-gunmetal shadow-sm'}`}>
                  {msg.role === 'bot' && (
                    <p className="mb-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-steel">TriCore</p>
                  )}
                  <p className="whitespace-pre-wrap leading-6">{msg.text.replace(/\*\*(.*?)\*\*/g, '$1')}</p>

                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                      {msg.products.map((p) => (
                        <Link key={p.slug} href={`/products/${p.slug}`} onClick={() => setOpen(false)} className="block rounded-lg border border-slate-200 bg-offwhite p-3 transition-colors hover:border-steel hover:bg-white">
                          <p className="text-xs font-bold text-navy">{p.name}</p>
                          <p className="mt-0.5 text-[0.7rem] text-gunmetal">{p.brand} — {p.description}</p>
                          {p.specs.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
                              {p.specs.slice(0, 3).map((s) => (
                                <span key={s} className="font-mono text-[0.6rem] text-steel">{s}</span>
                              ))}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}

                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
                      {msg.suggestions.map((s) => (
                        <button key={s} onClick={() => sendMessage(s)} className="rounded-full border border-slate-200 px-3 py-1 text-[0.7rem] font-medium text-steel transition-colors hover:border-steel hover:bg-steel hover:text-white">{s}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-steel animate-pulse" />
                    <span className="h-1.5 w-1.5 rounded-full bg-steel animate-pulse" style={{ animationDelay: '0.15s' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-steel animate-pulse" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about products, brands, or quotes…"
                className="flex-1 rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-navy placeholder:text-slate-400 focus:border-steel focus:outline-none"
                disabled={loading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white transition-colors hover:bg-steel disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8 ${open ? 'bg-gunmetal text-white' : 'bg-navy text-white'}`}
        aria-label={open ? 'Close chat' : 'Open product assistant'}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
