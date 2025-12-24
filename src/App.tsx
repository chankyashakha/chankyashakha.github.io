import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Hierarchy from "./pages/Hierarchy";
import Events from "./pages/Events";
import Schedule from "./pages/Schedule";
import List from "./pages/List";
import NotFound from "./pages/NotFound";
import GharSamparkTeam from "./pages/GharSamparkTeam";
import VgsAbhiyan from "./pages/VgsAbhiyan";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hierarchy" element={<Hierarchy />} />
          <Route path="/vgsAbhiyan" element={<VgsAbhiyan />} />
          <Route path="/events" element={<Events />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/list" element={<List />} />
          <Route path="/gharSamparkTeam" element={<GharSamparkTeam />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
