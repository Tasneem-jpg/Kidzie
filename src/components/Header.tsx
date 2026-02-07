import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, LayoutDashboard, Calendar, Sparkles } from "lucide-react";
import kidzieAvatar from "@/assets/kidzie-avatar.png";

const navItems = [
  { to: "/", label: "Home", icon: Sparkles },
  { to: "/chat", label: "Ask KidZie", icon: MessageCircle },
  { to: "/dashboard", label: "Parent Dashboard", icon: LayoutDashboard },
  { to: "/schedule", label: "Schedule", icon: Calendar },
];

const Header = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-card/80 border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={kidzieAvatar} alt="KidZie mascot" className="w-10 h-10 rounded-full" />
          <span className="text-2xl font-display font-bold text-gradient-hero">KidZie</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 gradient-hero rounded-full"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile nav */}
        <nav className="flex md:hidden items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative p-2 rounded-full transition-all ${
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabMobile"
                    className="absolute inset-0 gradient-hero rounded-full"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" />
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
