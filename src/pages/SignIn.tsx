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
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in user:", userCredential.user);
            navigate("/"); // redirect after login
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
                    Welcome back! Please enter your credentials.
                </p>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
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

                    {/* Password */}
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

                <p className="text-sm text-muted-foreground mt-4 text-center">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-primary font-semibold hover:underline">
                        Sign Up!
                    </Link>
                </p>
                <p className="text-sm text-muted-foreground mt-2 text-center">
                    <Link to="/forgot-password" className="text-primary font-semibold hover:underline">
                        Forgot Password?
                    </Link>
                </p>

            </motion.div>
        </div>
    );
};

export default SignInPage;
