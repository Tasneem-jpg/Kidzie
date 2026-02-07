import { motion } from "framer-motion";
import kidzieAvatar from "@/assets/kidzie-avatar.png";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const isBot = role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden shadow-soft mt-1">
          <img src={kidzieAvatar} alt="KidZie" className="w-full h-full object-cover" />
        </div>
      )}

      <div className={`max-w-[75%] ${isBot ? "" : ""}`}>
        <div
          className={`px-4 py-3 rounded-bubble text-sm leading-relaxed ${
            isBot
              ? "bg-card shadow-card text-card-foreground rounded-tl-md"
              : "gradient-hero text-primary-foreground rounded-tr-md"
          }`}
        >
          {content}
        </div>
        {timestamp && (
          <p className={`text-xs text-muted-foreground mt-1 ${isBot ? "text-left" : "text-right"}`}>
            {timestamp}
          </p>
        )}
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-secondary flex items-center justify-center mt-1 shadow-soft">
          <span className="text-sm">🧒</span>
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
