import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Clock,
  Atom,
  Palette,
  TreePine,
  Globe,
  Calculator,
  Microscope,
  Languages,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import Header from "@/components/Header";
import TopicBadge from "@/components/TopicBadge";

// Mock data
const activityLogs = [
  { id: 1, query: "Why is the sky blue?", category: "Physics", timestamp: "Today, 3:42 PM", ageAtTime: 8 },
  { id: 2, query: "How do volcanoes erupt?", category: "Earth Science", timestamp: "Today, 3:15 PM", ageAtTime: 8 },
  { id: 3, query: "What are dinosaurs?", category: "Biology", timestamp: "Today, 2:50 PM", ageAtTime: 8 },
  { id: 4, query: "How does a rainbow form?", category: "Physics", timestamp: "Yesterday, 5:20 PM", ageAtTime: 8 },
  { id: 5, query: "Why do we need to sleep?", category: "Biology", timestamp: "Yesterday, 4:00 PM", ageAtTime: 8 },
  { id: 6, query: "How do airplanes fly?", category: "Engineering", timestamp: "2 days ago", ageAtTime: 8 },
  { id: 7, query: "What is photosynthesis?", category: "Biology", timestamp: "2 days ago", ageAtTime: 8 },
  { id: 8, query: "Who was Cleopatra?", category: "History", timestamp: "3 days ago", ageAtTime: 8 },
];

const topicData = [
  { name: "Physics", value: 35, color: "hsl(175, 75%, 38%)" },
  { name: "Biology", value: 25, color: "hsl(145, 65%, 42%)" },
  { name: "History", value: 15, color: "hsl(15, 90%, 62%)" },
  { name: "Earth Science", value: 12, color: "hsl(270, 65%, 60%)" },
  { name: "Engineering", value: 8, color: "hsl(210, 85%, 55%)" },
  { name: "Art", value: 5, color: "hsl(45, 95%, 55%)" },
];

const weeklyActivity = [
  { day: "Mon", questions: 5 },
  { day: "Tue", questions: 8 },
  { day: "Wed", questions: 3 },
  { day: "Thu", questions: 12 },
  { day: "Fri", questions: 7 },
  { day: "Sat", questions: 15 },
  { day: "Sun", questions: 9 },
];

const weakPoints = [
  { topic: "Fractions & Decimals", category: "Math", severity: "high" },
  { topic: "Solar System Distances", category: "Space", severity: "medium" },
  { topic: "Historical Timelines", category: "History", severity: "low" },
];

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "hi", label: "हिन्दी" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
];

const categoryIcons: Record<string, React.ReactNode> = {
  Physics: <Atom className="w-4 h-4" />,
  Biology: <Microscope className="w-4 h-4" />,
  History: <BookOpen className="w-4 h-4" />,
  "Earth Science": <Globe className="w-4 h-4" />,
  Engineering: <Calculator className="w-4 h-4" />,
  Art: <Palette className="w-4 h-4" />,
  Nature: <TreePine className="w-4 h-4" />,
};

const severityColors = {
  high: "bg-kidzie-coral/10 text-kidzie-coral border-kidzie-coral/20",
  medium: "bg-kidzie-yellow/10 text-kidzie-yellow border-kidzie-yellow/20",
  low: "bg-kidzie-green/10 text-kidzie-green border-kidzie-green/20",
};

const ParentDashboard = () => {
  const [selectedLang, setSelectedLang] = useState("en");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-display font-bold">
              Parent <span className="text-gradient-hero">Dashboard</span>
            </h1>
            <p className="text-muted-foreground mt-1">Track your child's learning journey</p>
          </div>

          {/* Language selector */}
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Questions Asked", value: "47", icon: BookOpen, color: "kidzie-teal" },
            { label: "Topics Explored", value: "12", icon: TrendingUp, color: "kidzie-coral" },
            { label: "Weak Points", value: "3", icon: AlertTriangle, color: "kidzie-yellow" },
            { label: "Time Learning", value: "4.2h", icon: Clock, color: "kidzie-purple" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-5 shadow-card"
              >
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}/10 flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
                <p className="text-2xl font-display font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activity Logs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-card"
          >
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-kidzie-teal" />
              Recent Activity
            </h2>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {activityLogs.map((log, i) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    {categoryIcons[log.category] || <BookOpen className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{log.query}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        {log.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Topic Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-6 shadow-card"
          >
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-kidzie-coral" />
              Topic Summary
            </h2>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topicData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {topicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "var(--shadow-card)",
                      fontSize: "12px",
                      fontFamily: "Nunito",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2">
              {topicData.map((topic) => (
                <TopicBadge
                  key={topic.name}
                  label={topic.name}
                  count={topic.value}
                  color={`bg-[${topic.color}]/10 text-foreground`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Weekly Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl p-6 shadow-card"
          >
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-kidzie-green" />
              Weekly Activity
            </h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} fontFamily="Nunito" />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "var(--shadow-card)",
                      fontSize: "12px",
                      fontFamily: "Nunito",
                    }}
                  />
                  <Bar dataKey="questions" fill="hsl(175, 75%, 38%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Weak Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl p-6 shadow-card"
          >
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-kidzie-yellow" />
              Areas to Improve
            </h2>
            <div className="space-y-3">
              {weakPoints.map((point, i) => (
                <motion.div
                  key={point.topic}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className={`p-4 rounded-xl border ${severityColors[point.severity as keyof typeof severityColors]}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm text-foreground">{point.topic}</p>
                      <p className="text-xs text-muted-foreground mt-1">{point.category}</p>
                    </div>
                    <span className="text-xs font-bold uppercase px-2 py-1 rounded-full bg-card/50">
                      {point.severity}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              💡 Tip: Encourage your child to ask more questions about these topics!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
