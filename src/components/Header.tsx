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

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<"child" | "parent" | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Read the role we saved during Sign In
        const savedRole = localStorage.getItem("userRole") as "child" | "parent" | null;
        setRole(savedRole);
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Logical check for navigation links
  const getNavLinks = () => {
    if (!user) {
      return [{ to: "/", label: "Home", icon: Sparkles }];
    }

    if (role === "parent") {
      return [
        { to: "/dashboard", label: "Progress", icon: LayoutDashboard },
        { to: "/schedule", label: "Schedule", icon: Calendar },
      ];
    }

    if (role === "child") {
      return [
        { to: "/chat", label: "Ask KidZie", icon: MessageCircle },
        { to: "/schedule", label: "Schedule", icon: Calendar },
      ];
    }

    return [];
  };

  const navLinks = getNavLinks();

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
      localStorage.removeItem("userRole"); // Clear role on logout
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
          <img src={kidzieAvatar} alt="KidZie" className="w-10 h-10 rounded-full" />
          <span className="text-2xl font-display font-bold text-gradient-hero">
            KidZie
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => {
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

          <div ref={menuRef} className="relative ml-2">
            {user ? (
              <>
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold hover:bg-muted transition"
                >
                  Hi {user.displayName?.split(" ")[0] || "User"}!
                  {role && (
                    <span className="text-[10px] uppercase px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20">
                      {role}
                    </span>
                  )}
                </button>

                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-xl shadow-xl overflow-hidden"
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition text-left"
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