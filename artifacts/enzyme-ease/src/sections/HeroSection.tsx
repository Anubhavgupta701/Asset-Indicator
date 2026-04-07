import { motion } from "framer-motion";
import DalGrain3D from "@/components/DalGrain3D";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(14,165,233,0.08) 0%, rgba(34,197,94,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,165,233,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Text Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-sky-300 tracking-widest uppercase">
              Enzyme-Powered Dehusking
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl xl:text-6xl font-black leading-tight tracking-tight mb-6"
          >
            Cut Dal Loss.{" "}
            <span className="gradient-text-blue-green">Unlock Crores</span>
            <br />
            in Hidden Profit.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            EnzymeEase reduces dal milling loss from{" "}
            <span className="text-white font-semibold">10% down to 4–5%</span> per 100 kg
            — delivering a measurable{" "}
            <span className="text-emerald-400 font-semibold">₹1 Cr+ annual impact</span>{" "}
            for a 10 t/day mill, with a payback period under 3 months.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10"
          >
            {[
              { value: "50–60%", label: "Loss Reduction" },
              { value: "₹1 Cr+", label: "Annual Impact" },
              { value: "4 Weeks", label: "To Pilot" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-sky-400 text-glow-blue">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <a
              href="#profit-calculator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm transition-all duration-200 glow-blue"
            >
              Calculate Your Profit
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="#process-simulation"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-sky-500/50 text-white font-semibold text-sm transition-all duration-200"
            >
              See How It Works
            </a>
          </motion.div>
        </div>

        {/* Right: 3D Grain */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex-1 flex justify-center items-center"
        >
          <div className="relative w-72 h-72 sm:w-96 sm:h-96">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(34,197,94,0.08) 50%, transparent 70%)",
              }}
            />
            {/* Animated ring */}
            <div
              className="absolute inset-4 rounded-full border border-sky-500/20 animate-ping"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute inset-8 rounded-full border border-emerald-500/10 animate-ping"
              style={{ animationDuration: "4s", animationDelay: "1s" }}
            />

            {/* 3D Canvas */}
            <div className="absolute inset-0">
              <DalGrain3D />
            </div>

            {/* Labels */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute top-1/3 -left-16 hidden sm:flex items-center gap-2"
            >
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Dal Husk</p>
                <p className="text-xs text-sky-400 font-mono">Dehusking Layer</p>
              </div>
              <div className="w-8 h-px bg-sky-500/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400 glow-dot" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="absolute bottom-1/3 -right-16 hidden sm:flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 glow-dot" style={{ animationDelay: "0.5s" }} />
              <div className="w-8 h-px bg-emerald-500/50" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Dal Cotyledon</p>
                <p className="text-xs text-emerald-400 font-mono">Clean Recovery</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-border flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 rounded-full bg-sky-400"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
