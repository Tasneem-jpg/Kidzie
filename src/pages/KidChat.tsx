import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Camera, Sparkles, Lightbulb, Atom, Globe, TreePine, Palette, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ChatMessage from "@/components/ChatMessage";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const topicSuggestions = [
  { label: "Why is the sky blue?", icon: Lightbulb, color: "bg-kidzie-blue/10 text-kidzie-blue hover:bg-kidzie-blue/20" },
  { label: "How do volcanoes work?", icon: Atom, color: "bg-kidzie-coral/10 text-kidzie-coral hover:bg-kidzie-coral/20" },
  { label: "Tell me about dinosaurs!", icon: TreePine, color: "bg-kidzie-green/10 text-kidzie-green hover:bg-kidzie-green/20" },
  { label: "How does the internet work?", icon: Globe, color: "bg-kidzie-purple/10 text-kidzie-purple hover:bg-kidzie-purple/20" },
  { label: "What is a rainbow?", icon: Palette, color: "bg-kidzie-pink/10 text-kidzie-pink hover:bg-kidzie-pink/20" },
  { label: "Why is math important?", icon: Calculator, color: "bg-kidzie-yellow/10 text-kidzie-yellow hover:bg-kidzie-yellow/20" },
];

const API_URL = "http://localhost:8000/chat"; // FastAPI backend

const KidChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [childAge, setChildAge] = useState(8);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          age: childAge,
        }),
      });

      if (!res.ok) throw new Error("Backend error");

      const data = await res.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Oops! I couldn't reach my brain 🧠⚡ Try again!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        {/* Age selector */}
        <div className="px-4 py-3 flex items-center justify-center gap-3">
          <span className="text-sm font-semibold text-muted-foreground">I am</span>
          <div className="flex items-center gap-1">
            {[6, 7, 8, 9, 10, 11, 12].map((age) => (
              <button
                key={age}
                onClick={() => setChildAge(age)}
                className={`w-9 h-9 rounded-full text-sm font-bold transition-all duration-200 ${
                  childAge === age
                    ? "gradient-hero text-primary-foreground shadow-glow-teal scale-110"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {age}
              </button>
            ))}
          </div>
          <span className="text-sm font-semibold text-muted-foreground">years old</span>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-6xl mb-6"
              >
                <Sparkles className="w-16 h-16 text-kidzie-yellow" />
              </motion.div>
              <h2 className="text-2xl font-display font-bold mb-2 text-center">
                Hey there! I'm <span className="text-gradient-hero">KidZie</span>! 👋
              </h2>
              <p className="text-muted-foreground text-center mb-8 max-w-md">
                Ask me anything about science, history, math, or nature! I'll explain it in a way that's perfect for you.
              </p>

              <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {topicSuggestions.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <motion.button
                      key={topic.label}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSend(topic.label)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${topic.color}`}
                    >
                      <Icon className="w-4 h-4" />
                      {topic.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {messages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role} content={msg.content} timestamp={msg.timestamp} />
          ))}

          <AnimatePresence>
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-kidzie-teal animate-pulse" />
                <span className="text-sm text-muted-foreground">KidZie is thinking...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 bg-card rounded-full shadow-card px-4 py-2">
            <Button size="icon" variant="ghost" className="rounded-full text-kidzie-purple">
              <Camera className="w-5 h-5" />
            </Button>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything! 🌟"
              className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
            />

            <Button
              size="icon"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="rounded-full gradient-hero text-primary-foreground shadow-glow-teal"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidChat;
