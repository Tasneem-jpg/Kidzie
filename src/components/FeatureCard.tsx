import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "teal" | "coral" | "yellow" | "purple" | "green" | "blue" | "pink";
  delay?: number;
}

const colorMap = {
  teal: "bg-kidzie-teal/10 text-kidzie-teal border-kidzie-teal/20",
  coral: "bg-kidzie-coral/10 text-kidzie-coral border-kidzie-coral/20",
  yellow: "bg-kidzie-yellow/10 text-kidzie-yellow border-kidzie-yellow/20",
  purple: "bg-kidzie-purple/10 text-kidzie-purple border-kidzie-purple/20",
  green: "bg-kidzie-green/10 text-kidzie-green border-kidzie-green/20",
  blue: "bg-kidzie-blue/10 text-kidzie-blue border-kidzie-blue/20",
  pink: "bg-kidzie-pink/10 text-kidzie-pink border-kidzie-pink/20",
};

const iconBgMap = {
  teal: "bg-kidzie-teal",
  coral: "bg-kidzie-coral",
  yellow: "bg-kidzie-yellow",
  purple: "bg-kidzie-purple",
  green: "bg-kidzie-green",
  blue: "bg-kidzie-blue",
  pink: "bg-kidzie-pink",
};

const FeatureCard = ({ icon: Icon, title, description, color, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative p-6 rounded-2xl border bg-card shadow-card hover:shadow-elevated transition-shadow duration-300 ${colorMap[color]}`}
    >
      <div className={`w-12 h-12 rounded-xl ${iconBgMap[color]} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
      <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
