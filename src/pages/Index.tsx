import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  LayoutDashboard,
  Camera,
  Calendar,
  Sparkles,
  Brain,
  BookOpen,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import heroIllustration from "@/assets/hero-illustration.png";
import kidzieAvatar from "@/assets/kidzie-avatar.png";

const features = [
  {
    icon: MessageCircle,
    title: "Ask Anything!",
    description: "Chat with KidZie about science, history, math, or anything from school. Get explanations that match your age!",
    color: "teal" as const,
  },
  {
    icon: LayoutDashboard,
    title: "Parent Dashboard",
    description: "Track what your child is learning in real-time. See their curiosity topics, weak points, and growth.",
    color: "coral" as const,
  },
  {
    icon: Camera,
    title: "Snap & Learn",
    description: "Take a photo of anything — a bug, a plant, homework — and get a kid-friendly explanation instantly!",
    color: "purple" as const,
  },
  {
    icon: Calendar,
    title: "Smart Schedules",
    description: "AI-generated study plans based on what your child needs to practice. Copy straight to Google Calendar!",
    color: "green" as const,
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Parents can view dashboards in their native language for better accessibility and understanding.",
    color: "blue" as const,
  },
  {
    icon: Brain,
    title: "Adaptive Learning",
    description: "KidZie adjusts complexity based on age — LEGO analogies for young kids, technical terms for older ones.",
    color: "pink" as const,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-64 h-64 bg-kidzie-teal/10 rounded-full animate-blob blur-3xl" />
        <div className="absolute top-40 -right-20 w-72 h-72 bg-kidzie-coral/10 rounded-full animate-blob blur-3xl" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-10 left-1/3 w-56 h-56 bg-kidzie-yellow/10 rounded-full animate-blob blur-3xl" style={{ animationDelay: "4s" }} />

        <div className="container mx-auto px-4 pt-12 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kidzie-teal/10 text-kidzie-teal text-sm font-semibold mb-6"
              >
                <Sparkles className="w-4 h-4" />
                AI-Powered Learning for Every Kid
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Meet{" "}
                <span className="text-gradient-hero">KidZie</span>
                <br />
                Your AI Learning
                <br />
                <span className="text-gradient-warm">Buddy! </span>
                <motion.span
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-block"
                >
                  
                </motion.span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                KidZie makes learning fun for kids aged 6-12! Ask questions about science, history, 
                math — anything! Get answers that match your age and interests.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/chat">
                  <Button
                    size="lg"
                    className="gradient-hero text-primary-foreground shadow-glow-teal text-base px-8 py-6 rounded-full font-bold hover:opacity-90 transition-opacity"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Start Learning!
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 py-6 rounded-full font-bold border-2 hover:bg-muted"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    I'm a Parent
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src={heroIllustration}
                  alt="Colorful learning elements — books, planets, science icons"
                  className="w-full rounded-3xl shadow-elevated"
                />
                {/* Floating KidZie avatar */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-8 -left-4 w-24 h-24 rounded-2xl overflow-hidden shadow-elevated border-4 border-card"
                >
                  <img src={kidzieAvatar} alt="KidZie mascot" className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Everything Kids Need to{" "}
              <span className="text-gradient-hero">Learn & Grow</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powered by AI, designed for curious minds. KidZie adapts to every child's age and learning style.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 mb-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-hero rounded-3xl p-12 text-center shadow-elevated relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-card/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-card/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <h2 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-4 relative z-10">
              Ready to Start Learning? 
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto relative z-10">
              Join thousands of kids who are having fun while learning with KidZie!
            </p>
            <Link to="/chat" className="relative z-10">
              <Button
                size="lg"
                className="bg-card text-foreground hover:bg-card/90 text-base px-10 py-6 rounded-full font-bold shadow-elevated"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Let's Go!
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built by Sama, Tasneem and Zain for Mac-a-Thon 2026 · KidZie 
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
