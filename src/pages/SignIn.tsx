import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [accountType, setAccountType] = useState<"parent" | "child" | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountType) {
      setError("Please select Parent or Child account.");
      return;
    }
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Store the selection so the Header knows which links to show
      localStorage.setItem("userRole", accountType);
      
      console.log("Logged in user:", userCredential.user);
      navigate("/"); 
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <Header />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card rounded-2xl p-8 shadow-card mt-8"
      >
        <h1 className="text-3xl font-display font-bold mb-2 text-center">Log In</h1>
        <p className="text-center text-muted-foreground mb-6">
          Welcome back! Please select account type and enter credentials.
        </p>

        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setAccountType("parent")}
            className={`px-6 py-2 rounded-xl font-semibold transition ${
              accountType === "parent"
                ? "bg-primary text-background"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            Parent
          </button>
          <button
            type="button"
            onClick={() => setAccountType("child")}
            className={`px-6 py-2 rounded-xl font-semibold transition ${
              accountType === "child"
                ? "bg-primary text-background"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            Child
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>
            <div className="flex items-center bg-input border border-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30">
              <User className="w-4 h-4 text-muted-foreground mr-2" />
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium mb-1">Password</label>
            <div className="flex items-center bg-input border border-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30">
              <Lock className="w-4 h-4 text-muted-foreground mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-primary font-medium ml-2"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-background font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Sign Up!
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            <Link to="/forgot-password" title="Go to ForgotPassword.tsx" className="text-primary font-semibold hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInPage;