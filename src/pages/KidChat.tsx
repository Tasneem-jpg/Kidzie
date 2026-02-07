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

const mockResponses: Record<string, string> = {
  "Why is the sky blue?":
    "Great question! 🌤️ Imagine sunlight is like a bag of colorful LEGO bricks — red, orange, yellow, green, blue, and violet! When sunlight enters our atmosphere, the tiny air molecules scatter the blue bricks way more than the others because blue light waves are shorter and bouncier. So when you look up, you see blue scattered everywhere! It's like the sky is playing catch with just the blue LEGOs! 💙",
  "How do volcanoes work?":
    "Volcanoes are like Earth's pressure valves! 🌋 Deep underground, it's SO hot that rocks actually melt into a gooey liquid called magma. Think of it like a giant pot of tomato soup bubbling on the stove. When too much pressure builds up, the magma pushes up through cracks in the Earth and — BOOM! — it erupts out the top as lava! The Earth is basically sneezing out hot rock! 🤧🔥",
  "Tell me about dinosaurs!":
    "Dinosaurs are SO cool! 🦕 They lived on Earth for about 165 million years — that's WAY longer than humans have been around! Some were as tall as a 4-story building (like Brachiosaurus), and some were as small as a chicken (like Compsognathus). The T-Rex had teeth as big as bananas! 🍌 They went extinct about 66 million years ago when a giant asteroid hit Earth. Scientists learn about them by studying fossils — old bones turned to rock!",
  "How does the internet work?":
    "The internet is like a super-fast mail system! 📬 When you watch a video, your computer sends a tiny letter saying 'I want this video please!' That letter zooms through wires (even under the ocean! 🌊) to a big computer called a server. The server breaks the video into tiny puzzle pieces called 'packets' and sends them back. Your computer puts the puzzle back together super fast — and boom, you see the video! It's like magic, but it's really science! ✨",
  "What is a rainbow?":
    "A rainbow is nature's art show! 🌈 When sunlight hits raindrops in the air, something amazing happens. Each raindrop works like a tiny prism — it bends the light and splits it into all its hidden colors! Red, orange, yellow, green, blue, and violet all fan out across the sky. You always see rainbows when the sun is behind you and rain is in front of you. Double rainbows happen when light bounces twice inside the raindrops! 🎨",
  "Why is math important?":
    "Math is like a superpower! 🦸 It's everywhere, even when you don't notice it. When you share pizza equally with friends — that's math! 🍕 When you save up allowance for a toy — that's math! When video games calculate if your character hits the target — math! Even music uses math patterns! Scientists use math to build rockets 🚀, doctors use it to figure out medicine doses, and game designers use it to create your favorite games. Math helps you solve puzzles and think clearly about everything! 🧠",
};

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
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response (will be replaced with real Gemini API)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responseText =
      mockResponses[messageText] ||
      `That's a fantastic question! 🌟 Let me think about "${messageText}"... Since you're ${childAge} years old, I'll explain it in a way that's perfect for you! This is a mock response — once we connect the AI backend, KidZie will give you a real, personalized answer! 🤖✨`;

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
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

              {/* Topic suggestions */}
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

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-kidzie-teal/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-kidzie-teal animate-pulse" />
                </div>
                <div className="bg-card shadow-soft px-4 py-3 rounded-bubble rounded-tl-md">
                  <div className="flex gap-1.5">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-kidzie-teal rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-kidzie-coral rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-kidzie-yellow rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 bg-card rounded-full shadow-card px-4 py-2">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full text-kidzie-purple hover:bg-kidzie-purple/10 flex-shrink-0"
              onClick={() => {
                // Image upload placeholder
                alert("📸 Image upload will be connected to the AI backend soon!");
              }}
            >
              <Camera className="w-5 h-5" />
            </Button>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything! 🌟"
              className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder:text-muted-foreground"
            />

            <Button
              size="icon"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="rounded-full gradient-hero text-primary-foreground shadow-glow-teal flex-shrink-0 disabled:opacity-40"
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
