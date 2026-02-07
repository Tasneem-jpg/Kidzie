import { motion } from "framer-motion";

interface TopicBadgeProps {
  label: string;
  count: number;
  color: string;
}

const TopicBadge = ({ label, count, color }: TopicBadgeProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-soft ${color}`}
    >
      <span>{label}</span>
      <span className="bg-card/30 px-2 py-0.5 rounded-full text-xs">{count}</span>
    </motion.div>
  );
};

export default TopicBadge;
