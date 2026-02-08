import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import KidChat from "./pages/KidChat";
import ParentDashboard from "./pages/ParentDashboard";
import ScheduleGenerator from "./pages/ScheduleGenerator";
import SignInPage from "./pages/SignIn"; // ✅ import SignInPage
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={<KidChat />} />
          <Route path="/dashboard" element={<ParentDashboard />} />
          <Route path="/schedule" element={<ScheduleGenerator />} />
          <Route path="/signin" element={<SignInPage />} /> {/* ✅ add route */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<SignUp />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
