import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  X,
  Trash2,
  Copy,
  Check,
  Zap,
  Leaf,
  Palette,
  Brain,
  ChevronDown,
  Loader2,
  RotateCcw,
  Info,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { ChatMessage, ChatPersona, ClassificationResult } from "../types";

interface GeminiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem?: ClassificationResult | null;
}

interface PersonaConfig {
  id: ChatPersona;
  name: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  defaultModel: string;
  accentBg: string;
  accentText: string;
  badgeBorder: string;
  starterPrompt: string;
}

const PERSONAS: PersonaConfig[] = [
  {
    id: "advisor",
    name: "Zero-Waste Advisor",
    shortLabel: "Eco-Advisor",
    icon: Leaf,
    description: "General waste segregation, contamination mitigation, and UN SDG 12 guidance.",
    defaultModel: "gemini-3.8-flash",
    accentBg: "bg-emerald-50 dark:bg-emerald-950/50",
    accentText: "text-emerald-700 dark:text-emerald-300",
    badgeBorder: "border-emerald-300 dark:border-emerald-700/60",
    starterPrompt: "Hi! I'm your EcoSort Advisor. Ask me anything about segregating campus or household waste, avoiding bin contamination, or local recycling rules.",
  },
  {
    id: "fast_sorter",
    name: "Instant Bin Sorter",
    shortLabel: "Speed Sorter",
    icon: Zap,
    description: "Rapid, 2-bullet bin decisions and prep instructions at lightning speed.",
    defaultModel: "gemini-3.1-flash-lite",
    accentBg: "bg-amber-50 dark:bg-amber-950/50",
    accentText: "text-amber-700 dark:text-amber-300",
    badgeBorder: "border-amber-300 dark:border-amber-700/60",
    starterPrompt: "⚡ Rapid Sorter active (gemini-3.1-flash-lite). Name any item (e.g. 'greasy wrapper', 'blister pack', 'plastic fork') for an instant bin decision!",
  },
  {
    id: "upcycler",
    name: "Circular DIY Crafter",
    shortLabel: "DIY Upcycler",
    icon: Palette,
    description: "Zero-cost DIY repurposing projects and creative dorm room crafts.",
    defaultModel: "gemini-3.5-flash",
    accentBg: "bg-purple-50 dark:bg-purple-950/50",
    accentText: "text-purple-700 dark:text-purple-300",
    badgeBorder: "border-purple-300 dark:border-purple-700/60",
    starterPrompt: "🎨 DIY Upcycling Maker ready! What waste items do you have lying around in your dorm or kitchen? Let's turn them into something useful!",
  },
  {
    id: "auditor",
    name: "LCA & Policy Auditor",
    shortLabel: "Policy Auditor",
    icon: Brain,
    description: "Complex Life Cycle Assessments (LCA), MRF economics, and campus procurement policy.",
    defaultModel: "gemini-3.1-pro-preview",
    accentBg: "bg-indigo-50 dark:bg-indigo-950/50",
    accentText: "text-indigo-700 dark:text-indigo-300",
    badgeBorder: "border-indigo-300 dark:border-indigo-700/60",
    starterPrompt: "🧠 Senior Sustainability Auditor online (gemini-3.1-pro-preview). Inquire on material recovery economics, diversion targets, or campus policy frameworks.",
  },
];

const SUGGESTED_QUESTIONS = [
  "How should I prep an oily pizza box for recycling?",
  "What can I DIY make with 3 plastic soda bottles?",
  "Can dirty aluminum foil or blister packs be recycled?",
  "How do we draft a campus dining hall zero-waste policy?",
];

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  isOpen,
  onClose,
  currentItem,
}) => {
  const [selectedPersona, setSelectedPersona] = useState<ChatPersona>("advisor");
  const [customModel, setCustomModel] = useState<string>("");
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize messages from localStorage or defaults
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ecosort-chat-history");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.error("Failed to parse chat history:", e);
      }
    }
    return [
      {
        id: "msg-welcome-1",
        role: "model",
        content:
          "👋 **Welcome to EcoSort AI Chat!**\n\nI am your interactive campus & household circular sustainability companion powered by Gemini.\n\n* **Ask about any item** (e.g. coffee cups, electronics, compostables)\n* **Switch personas** above to change between instant speed sorting, creative DIY upcycling, or in-depth LCA auditing.\n\nHow can I help you reduce waste today?",
        timestamp: Date.now(),
        modelUsed: "gemini-3.8-flash",
        persona: "advisor",
      },
    ];
  });

  // Save messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ecosort-chat-history", JSON.stringify(messages));
    } catch (e) {
      console.error("Failed to save chat history:", e);
    }
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Focus textarea on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const activePersonaConfig =
    PERSONAS.find((p) => p.id === selectedPersona) || PERSONAS[0];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: Date.now(),
      persona: selectedPersona,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Send conversation history to backend /api/chat
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          persona: selectedPersona,
          modelPreference: customModel || activePersonaConfig.defaultModel,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      const botMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: "model",
        content: data.reply || "I analyzed your request. Let's make sure we segregate this correctly.",
        timestamp: Date.now(),
        modelUsed: data.modelUsed || activePersonaConfig.defaultModel,
        persona: selectedPersona,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error("Failed to send chat message:", error);
      const fallbackMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: "model",
        content: `⚠️ I encountered a temporary connection issue. However, based on **EcoSort Zero-Waste Guidelines**:\n\n* **Dry Materials:** Ensure rinsed & placed in **Blue Bin**.\n* **Wet Food Organics:** Divert to **Green Bin** to prevent methane emission.\n* **Contamination Alert:** Always peel off food-stained paper surfaces before recycling!`,
        timestamp: Date.now(),
        modelUsed: "EcoSort Knowledge Engine (Offline Fallback)",
        persona: selectedPersona,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear your conversation history?")) {
      const resetMsg: ChatMessage = {
        id: `msg-welcome-${Date.now()}`,
        role: "model",
        content: `Conversation reset. Switched to **${activePersonaConfig.name}** mode.\n\n${activePersonaConfig.starterPrompt}`,
        timestamp: Date.now(),
        modelUsed: activePersonaConfig.defaultModel,
        persona: selectedPersona,
      };
      setMessages([resetMsg]);
      localStorage.removeItem("ecosort-chat-history");
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAskAboutCurrentItem = () => {
    if (!currentItem) return;
    const prompt = `Can you give me detailed segregation instructions and potential upcycling ideas for "${currentItem.itemName}"?`;
    handleSendMessage(prompt);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chatbot-title"
    >
      <div
        className={`bg-white dark:bg-slate-900 w-full rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-all duration-300 ${
          isExpanded
            ? "max-w-5xl h-[92vh]"
            : "max-w-2xl h-[88vh] sm:h-[680px]"
        }`}
      >
        {/* Chat Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-emerald-800 to-teal-900 dark:from-emerald-950 dark:to-teal-950 text-white flex items-center justify-between border-b dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
              <Bot className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="chatbot-title" className="font-bold text-sm sm:text-base text-white flex items-center gap-1.5">
                  EcoSort Gemini Chat
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                  Multi-Turn
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/90 flex items-center gap-1">
                <span>Active Model:</span>
                <span className="font-mono text-white/90">
                  {customModel || activePersonaConfig.defaultModel}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={handleClearChat}
              title="Clear Conversation History"
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Collapse view" : "Expand view"}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors hidden sm:block"
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onClose}
              title="Close chat"
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Persona Selector Strip */}
        <div className="bg-slate-50 dark:bg-slate-850 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden sm:inline mr-1">
              Role:
            </span>
            {PERSONAS.map((p) => {
              const Icon = p.icon;
              const isSelected = selectedPersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersona(p.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? `${p.accentBg} ${p.accentText} ${p.badgeBorder} shadow-2xs`
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750"
                  }`}
                  title={`${p.name}: ${p.description} (Powered by ${p.defaultModel})`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{p.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Model indicator / override dropdown */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
            <span className="text-slate-400 dark:text-slate-500">Model:</span>
            <select
              value={customModel || activePersonaConfig.defaultModel}
              onChange={(e) => setCustomModel(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-1.5 py-0.5 text-[11px] font-mono text-slate-700 dark:text-slate-300 focus:outline-hidden"
            >
              <option value="gemini-3.8-flash">gemini-3.8-flash (General)</option>
              <option value="gemini-3.5-flash">gemini-3.5-flash (Balanced)</option>
              <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Ultra-Fast)</option>
              <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Complex Tasks)</option>
            </select>
          </div>
        </div>

        {/* Current Scanned Item Banner (if item present) */}
        {currentItem && (
          <div className="px-4 py-1.5 bg-emerald-50/70 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300 truncate">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-semibold truncate">
                Scanned: {currentItem.itemName}
              </span>
            </div>
            <button
              onClick={handleAskAboutCurrentItem}
              className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 hover:underline shrink-0 ml-2"
            >
              Ask about this item →
            </button>
          </div>
        )}

        {/* Messages Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-sm text-slate-800 dark:text-slate-200">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  isUser ? "justify-end" : "justify-start"
                } group`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shrink-0 shadow-xs mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed relative ${
                    isUser
                      ? "bg-emerald-600 text-white rounded-tr-xs shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/80 dark:border-slate-700/60 shadow-2xs"
                  }`}
                >
                  {/* Message role/persona badge for model */}
                  {!isUser && msg.modelUsed && (
                    <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-slate-200/60 dark:border-slate-700/60 text-[10px] text-slate-400 dark:text-slate-400 font-mono">
                      <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                        <Bot className="w-3 h-3" />
                        EcoSort AI
                      </span>
                      <span>{msg.modelUsed}</span>
                    </div>
                  )}

                  {/* Render content with formatted breaks and markdown styling */}
                  <div className="whitespace-pre-wrap break-words leading-relaxed space-y-1">
                    {formatMessageContent(msg.content)}
                  </div>

                  {/* Message timestamp and copy button */}
                  <div
                    className={`flex items-center justify-between gap-2 mt-2 pt-1 text-[10px] ${
                      isUser
                        ? "text-emerald-100"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      className={`opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10 ${
                        copiedId === msg.id ? "opacity-100" : ""
                      }`}
                      title="Copy message"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-300" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 shrink-0 shadow-xs mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-xs px-4 py-3 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600 dark:text-emerald-400" />
                <span>EcoSort is thinking with {customModel || activePersonaConfig.defaultModel}...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries Strip */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Quick:
          </span>
          {SUGGESTED_QUESTIONS.map((query, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(query)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 whitespace-nowrap transition-colors shrink-0 shadow-2xs"
            >
              {query}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2"
          >
            <div className="flex-1 relative rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask ${activePersonaConfig.name} anything about waste, sorting, or upcycling... (Enter to send)`}
                rows={2}
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 resize-none focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-emerald-700/20 disabled:shadow-none shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 px-1">
            <span>Shift + Enter for new line • Enter to send</span>
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3" />
              Aligned with UN SDG 12
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple helper to format basic bold and bullet markers cleanly in message thread
function formatMessageContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, idx) => {
    // Bold tags replacement
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <div key={idx} className={line.trim().startsWith("* ") || line.trim().startsWith("- ") ? "pl-2" : ""}>
        {parts.map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={pIdx} className="font-semibold">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </div>
    );
  });
}
