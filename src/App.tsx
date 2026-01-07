
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Games from "./pages/Games";
import Achievements from "./pages/Achievements";
import Community from "./pages/Community";
import Suggestions from "./pages/Suggestions";
import NotFound from "./pages/NotFound";
import WeeklyChallenges from "./pages/WeeklyChallenges";
import EducationalContent from "./pages/EducationalContent";
import DailyTips from "./pages/DailyTips";
import EcoResources from "./pages/EcoResources";
import ParentsInfo from "./pages/ParentsInfo";
import ChildSafety from "./pages/ChildSafety";
import EcoGuiaAI from "./components/EcoGuiaAI";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/games" element={<Games />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/community" element={<Community />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/weekly-challenges" element={<WeeklyChallenges />} />
          <Route path="/educational-content" element={<EducationalContent />} />
          <Route path="/daily-tips" element={<DailyTips />} />
          <Route path="/eco-resources" element={<EcoResources />} />
          <Route path="/parents-info" element={<ParentsInfo />} />
          <Route path="/child-safety" element={<ChildSafety />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <EcoGuiaAI />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
