import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Lock, User, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase"; // your firebase.ts file

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Optionally set display name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      console.log("User created:", userCredential.user);
      navigate("/"); // redirect after sign up
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create account");
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
        <h1 className="text-3xl font-display font-bold mb-2 text-center">
          Sign Up
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Create a new account to start your learning journey.
        </p>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium mb-1">Full Name</label>
            <div className="flex items-center bg-input border border-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30">
              <User className="w-4 h-4 text-muted-foreground mr-2" />
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>
            <div className="flex items-center bg-input border border-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30">
              <Mail className="w-4 h-4 text-muted-foreground mr-2" />
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

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium mb-1">Password</label>
            <div className="flex items-center bg-input border border-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30">
              <Lock className="w-4 h-4 text-muted-foreground mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter a password"
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
            Sign Up
          </button>
        </form>

        <p className="text-sm text-muted-foreground mt-4 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
