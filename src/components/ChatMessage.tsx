import { motion } from "framer-motion";
import kidzieAvatar from "@/assets/kidzie-avatar.png";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  image?: string; // Add this prop for the generated image
  timestamp?: string;
}

const ChatMessage = ({ role, content, image, timestamp }: ChatMessageProps) => {
  const isBot = role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden shadow-soft mt-1 border-2 border-kidzie-teal/20">
          <img src={kidzieAvatar} alt="KidZie" className="w-full h-full object-cover" />
        </div>
      )}

      <div className={`max-w-[75%] flex flex-col ${isBot ? "items-start" : "items-end"}`}>
        <div
          className={`px-4 py-3 rounded-bubble text-sm leading-relaxed shadow-sm ${
            isBot
              ? "bg-card text-card-foreground rounded-tl-md border border-border"
              : "gradient-hero text-primary-foreground rounded-tr-md"
          }`}
        >
          {content}
        </div>

        {/* Display the image if it exists */}
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 relative group"
          >
            <div className="rounded-2xl overflow-hidden border-4 border-white shadow-glow-teal bg-white">
              <img 
                src={image} 
                alt="KidZie's Drawing" 
                className="w-full h-auto max-w-[280px] object-contain"
              />
            </div>
            {/* Optional "Art" Badge */}
            <div className="absolute -top-2 -right-2 bg-kidzie-yellow text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-md transform rotate-12">
              ART! 🎨
            </div>
          </motion.div>
        )}

        {timestamp && (
          <p className={`text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-medium`}>
            {timestamp}
          </p>
        )}
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-secondary flex items-center justify-center mt-1 shadow-soft border-2 border-white">
          <span className="text-sm">🧒</span>
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;