import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Camera, Sparkles, Lightbulb, Atom, Globe, TreePine, Palette, Calculator, Mic, Volume2, Pause, Play } from "lucide-react";
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
  { label: "Why is the sky blue?", icon: Lightbulb, color: "bg-kidzie-blue/10 text-kidzie-blue hover:bg-kidzie-blue/20 border-kidzie-blue/20" },
  { label: "How do volcanoes work?", icon: Atom, color: "bg-kidzie-coral/10 text-kidzie-coral hover:bg-kidzie-coral/20 border-kidzie-coral/20" },
  { label: "Tell me about dinosaurs!", icon: TreePine, color: "bg-kidzie-green/10 text-kidzie-green hover:bg-kidzie-green/20 border-kidzie-green/20" },
  { label: "How does the internet work?", icon: Globe, color: "bg-kidzie-purple/10 text-kidzie-purple hover:bg-kidzie-purple/20 border-kidzie-purple/20" },
  { label: "What is a rainbow?", icon: Palette, color: "bg-kidzie-pink/10 text-kidzie-pink hover:bg-kidzie-pink/20 border-kidzie-pink/20" },
  { label: "Why is math important?", icon: Calculator, color: "bg-kidzie-yellow/10 text-kidzie-yellow hover:bg-kidzie-yellow/20 border-kidzie-yellow/20" },
];

const API_URL = "http://localhost:8000/chat";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const KidChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [childAge, setChildAge] = useState(8);
  const [isListening, setIsListening] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const updateVoices = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Premium")) 
                         || voices.find(v => v.lang.startsWith("en")) 
                         || voices[0];
    setSelectedVoice(preferredVoice);
  }, []);

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = updateVoices;
    updateVoices();
  }, [updateVoices]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
  }, []);

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsPaused(false);
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = 1.0; 
    utterance.pitch = 1.15;
    window.speechSynthesis.speak(utterance);
  };

  const togglePause = () => {
    if (window.speechSynthesis.speaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const startListening = () => {
    if (!recognitionRef.current) return;
    setIsListening(true);
    recognitionRef.current.start();
  };

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
        body: JSON.stringify({ message: messageText, age: childAge }),
      });
      const data = await res.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMessage]);
      speak(data.response);
    } catch (err) {
      speak("Oops! I couldn't reach my brain.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Header />

      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full pb-32">
        {/* Age selector */}
        <div className="px-4 py-3 flex items-center justify-center gap-3">
          <span className="text-sm font-semibold text-muted-foreground">I am</span>
          <div className="flex items-center gap-1">
            {[6, 7, 8, 9, 10, 11, 12].map((age) => (
              <button
                key={age}
                onClick={() => setChildAge(age)}
                className={`w-9 h-9 rounded-full text-sm font-bold transition-all duration-200 ${
                  childAge === age ? "gradient-hero text-primary-foreground shadow-glow-teal scale-110" : "bg-muted"
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 px-4 py-4 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Sparkles className="w-12 h-12 text-kidzie-yellow mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Hi! I'm KidZie!</h2>
              <p className="text-muted-foreground mb-8">Pick a question below or ask your own!</p>
              
              {/* 3x2 Grid Layout for Suggestions */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-2xl px-2">
                {topicSuggestions.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(topic.label)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm ${topic.color}`}
                  >
                    <topic.icon className="w-6 h-6" />
                    <span className="text-center leading-tight">{topic.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col gap-2">
              <div className="relative inline-block max-w-[85%]">
                <ChatMessage role={msg.role} content={msg.content} timestamp={msg.timestamp} />
                
                {msg.role === "assistant" && (
                  <div className="flex gap-2 mt-2 ml-2">
                    <button
                      onClick={() => speak(msg.content)}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-kidzie-teal/10 text-kidzie-teal hover:bg-kidzie-teal/20 text-xs font-bold border border-kidzie-teal/20 transition-colors"
                    >
                      <Volume2 className="w-3 h-3" /> Replay
                    </button>
                    <button
                      onClick={togglePause}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-kidzie-purple/10 text-kidzie-purple hover:bg-kidzie-purple/20 text-xs font-bold border border-kidzie-purple/20 transition-colors"
                    >
                      {isPaused ? <><Play className="w-3 h-3" /> Resume</> : <><Pause className="w-3 h-3" /> Pause</>}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          <AnimatePresence>
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-kidzie-teal animate-pulse" />
                <span className="text-sm text-muted-foreground font-medium">KidZie is thinking...</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Fixed Input Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent">
          <div className="max-w-3xl mx-auto flex items-center gap-2 bg-card rounded-full shadow-2xl px-4 py-3 border border-border">
            <Button size="icon" variant="ghost" className="rounded-full text-muted-foreground hover:text-kidzie-purple">
              <Camera className="w-5 h-5" />
            </Button>

            <button
              onClick={startListening}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-lg ${
                isListening 
                ? "bg-red-500 scale-110 animate-pulse shadow-red-200" 
                : "bg-gradient-to-br from-kidzie-teal to-kidzie-blue hover:shadow-glow-teal"
              }`}
            >
              <Mic className={`w-5 h-5 ${isListening ? "text-white" : "text-primary-foreground"}`} />
              {isListening && (
                <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-25"></span>
              )}
            </button>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything! 🌟"
              className="flex-1 bg-transparent border-none outline-none text-base px-2"
            />

            <Button
              size="icon"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="rounded-full w-10 h-10 gradient-hero text-primary-foreground shadow-md transition-transform active:scale-95"
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