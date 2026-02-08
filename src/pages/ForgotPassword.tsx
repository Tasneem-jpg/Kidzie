import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to send password reset email");
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
          Reset Password
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Enter your email and we’ll send you a password reset link.
        </p>

        {message && <p className="text-green-500 mb-2">{message}</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-background font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Send Reset Email
          </button>
        </form>

        <p className="text-sm text-muted-foreground mt-4 text-center">
          Remembered your password?{" "}
          <Link to="/signin" className="text-primary font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
