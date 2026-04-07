import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import HeroSection from "@/sections/HeroSection";
import ProfitCalculator from "@/sections/ProfitCalculator";
import ProcessSimulation from "@/sections/ProcessSimulation";
import HowItWorks from "@/sections/HowItWorks";
import ImplementationTimeline from "@/sections/ImplementationTimeline";
import ComparisonTable from "@/sections/ComparisonTable";
import TrustSection from "@/sections/TrustSection";
import FinalCTA from "@/sections/FinalCTA";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <main>
          <HeroSection />
          <ProfitCalculator />
          <ProcessSimulation />
          <HowItWorks />
          <ImplementationTimeline />
          <ComparisonTable />
          <TrustSection />
          <FinalCTA />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
