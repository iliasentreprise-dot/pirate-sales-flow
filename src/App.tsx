import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Orderbump from "./pages/Orderbump.tsx";
import Upsell0 from "./pages/Upsell0.tsx";
import Upsell1 from "./pages/Upsell1.tsx";
import Upsell2 from "./pages/Upsell2.tsx";
import Merci from "./pages/Merci.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/orderbump" element={<Orderbump />} />
          <Route path="/upsell0" element={<Upsell0 />} />
          <Route path="/upsell1" element={<Upsell1 />} />
          <Route path="/upsell2" element={<Upsell2 />} />
          <Route path="/merci" element={<Merci />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
