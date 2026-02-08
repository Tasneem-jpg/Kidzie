import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageCircle,
  LayoutDashboard,
  Calendar,
  Sparkles,
  LogIn,
} from "lucide-react";
import kidzieAvatar from "@/assets/kidzie-avatar.png";
import { useState, useEffect, useRef } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const navItems = [
  { to: "/", label: "Home", icon: Sparkles },
  { to: "/chat", label: "Ask KidZie", icon: MessageCircle },
  { to: "/dashboard", label: "Parent Dashboard", icon: LayoutDashboard },
  { to: "/schedule", label: "Schedule", icon: Calendar },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMenuOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-card/80 border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={kidzieAvatar} alt="KidZie mascot" className="w-10 h-10 rounded-full" />
          <span className="text-2xl font-display font-bold text-gradient-hero">
            KidZie
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
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

          {/* Login / User Dropdown */}
          <div ref={menuRef} className="relative">
            {user ? (
              <>
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="px-4 py-2 rounded-full text-sm font-semibold hover:bg-muted transition"
                >
                  Hi {user.displayName || "User"}!
                </button>

                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-xl shadow-card overflow-hidden"
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition text-left"
                    >
                      Log Out
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <Link
                to="/signin"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition"
              >
                <LogIn className="w-4 h-4" />
                Log In
              </Link>
            )}
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
