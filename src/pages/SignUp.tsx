import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Lock, User, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";

const SignUp = () => {
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPassword, setParentPassword] = useState("");
  const [childName, setChildName] = useState("");
  const [childEmail, setChildEmail] = useState("");
  const [childPassword, setChildPassword] = useState("");
  const [showParentPassword, setShowParentPassword] = useState(false);
  const [showChildPassword, setShowChildPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Create parent account
      const parentCredential = await createUserWithEmailAndPassword(
        auth,
        parentEmail,
        parentPassword
      );

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: parentName });
      }

      // Optionally, store child credentials in Firestore (or separate auth user)
      // For simplicity, create a separate Firebase Auth user for the child
      const childCredential = await createUserWithEmailAndPassword(
        auth,
        childEmail,
        childPassword
      );

      if (childCredential.user) {
        await updateProfile(childCredential.user, { displayName: childName });
      }

      console.log("Parent created:", parentCredential.user);
      console.log("Child created:", childCredential.user);

      // Redirect to home
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create accounts");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <Header />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-card rounded-2xl p-8 shadow-card mt-8"
      >
        <h1 className="text-3xl font-display font-bold mb-2 text-center">
          Sign Up
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Create accounts for both parent and child.
        </p>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Parent Section */}
          <div>
            <h2 className="font-semibold mb-2">Parent Information</h2>

            <div className="flex flex-col mb-2">
              <label htmlFor="parentName" className="text-sm font-medium mb-1">
                Name
              </label>
              <div className="flex items-center bg-input border border-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30">
                <User className="w-4 h-4 text-muted-foreground mr-2" />
                <input
                  type="text"
                  id="parentName"
                  placeholder="Parent Name"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="parentEmail" className="text-sm font-medium mb-1">
                Email
              </label>
              <div className="flex items-center bg-input border border-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30">
                <Mail className="w-4 h-4 text-muted-foreground mr-2" />
                <input
                  type="email"
                  id="parentEmail"
                  placeholder="parent@example.com"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="parentPassword" className="text-sm font-medium mb-1">
                Password
              </label>
              <div className="flex items-center bg-input border border-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30">
                <Lock className="w-4 h-4 text-muted-foreground mr-2" />
                <input
                  type={showParentPassword ? "text" : "password"}
                  id="parentPassword"
                  placeholder="Enter a password"
                  value={parentPassword}
                  onChange={(e) => setParentPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowParentPassword(!showParentPassword)}
                  className="text-xs text-primary font-medium ml-2"
                >
                  {showParentPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          {/* Child Section */}
          <div>
            <h2 className="font-semibold mb-2">Child Information</h2>

            <div className="flex flex-col mb-2">
              <label htmlFor="childName" className="text-sm font-medium mb-1">
                Name
              </label>
              <div className="flex items-center bg-input border border-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30">
                <User className="w-4 h-4 text-muted-foreground mr-2" />
                <input
                  type="text"
                  id="childName"
                  placeholder="Child Name"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="childEmail" className="text-sm font-medium mb-1">
                Email
              </label>
              <div className="flex items-center bg-input border border-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30">
                <Mail className="w-4 h-4 text-muted-foreground mr-2" />
                <input
                  type="email"
                  id="childEmail"
                  placeholder="child@example.com"
                  value={childEmail}
                  onChange={(e) => setChildEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="childPassword" className="text-sm font-medium mb-1">
                Password
              </label>
              <div className="flex items-center bg-input border border-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30">
                <Lock className="w-4 h-4 text-muted-foreground mr-2" />
                <input
                  type={showChildPassword ? "text" : "password"}
                  id="childPassword"
                  placeholder="Enter a password"
                  value={childPassword}
                  onChange={(e) => setChildPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowChildPassword(!showChildPassword)}
                  className="text-xs text-primary font-medium ml-2"
                >
                  {showChildPassword ? "Hide" : "Show"}
                </button>
              </div>
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