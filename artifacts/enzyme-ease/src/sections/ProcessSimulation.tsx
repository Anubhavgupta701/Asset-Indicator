import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

type SimStep = {
  id: number;
  label: string;
  description: string;
  breakageLevel: number;
};

const traditionalSteps: SimStep[] = [
  {
    id: 1,
    label: "Pass 1 — Abrasion Milling",
    description: "High-friction rollers strip husk. Significant surface breakage begins.",
    breakageLevel: 25,
  },
  {
    id: 2,
    label: "Pass 2 — Re-milling",
    description: "Unstripped grains recycled. Cumulative mechanical stress causes cotyledon fractures.",
    breakageLevel: 55,
  },
  {
    id: 3,
    label: "Pass 3 — Fine Milling",
    description: "Third pass for stubborn husk. 8–12% of dal converted to flour/powder.",
    breakageLevel: 80,
  },
  {
    id: 4,
    label: "Pass 4 — Sorting",
    description: "Damaged, split, and broken dal separated. High rejection rate. Loss: ~10%.",
    breakageLevel: 100,
  },
];

const enzymeEaseSteps: SimStep[] = [
  {
    id: 1,
    label: "Enzyme Pre-treatment",
    description: "FSSAI-approved enzyme solution applied uniformly. Targeted bond weakening begins.",
    breakageLevel: 5,
  },
  {
    id: 2,
    label: "Controlled Incubation (4–8 hrs)",
    description: "Enzyme action selectively cleaves husk-cotyledon adhesion bonds. Zero mechanical stress.",
    breakageLevel: 5,
  },
  {
    id: 3,
    label: "Pass 1 — Light Dehusking",
    description: "Minimal friction needed. Husk slides off intact cotyledon. Breakage < 5%.",
    breakageLevel: 15,
  },
  {
    id: 4,
    label: "Clean Recovery",
    description: "Whole, intact dal grains recovered. 4–5% loss rate. Grade A quality maintained.",
    breakageLevel: 20,
  },
];

function BreakageIndicator({ level, color }: { level: number; color: string }) {
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>Grain Integrity</span>
        <span className={color === "red" ? "text-red-400" : "text-emerald-400"}>
          {100 - level}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color === "red" ? "bg-red-500" : "bg-emerald-500"}`}
          initial={{ width: "0%" }}
          animate={{ width: `${100 - level}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function GrainVisualization({
  breakageLevel,
  variant,
}: {
  breakageLevel: number;
  variant: "traditional" | "enzymeease";
}) {
  const grainCount = 20;
  const brokenCount = Math.floor((breakageLevel / 100) * grainCount);

  return (
    <div className="grid grid-cols-5 gap-1.5 mt-4 p-3 bg-black/20 rounded-xl">
      {Array.from({ length: grainCount }).map((_, i) => {
        const isBroken = i < brokenCount;
        const isDust = i < Math.floor(brokenCount * 0.4);

        return (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.02 }}
            className="relative flex items-center justify-center"
          >
            {isDust ? (
              <div className="w-4 h-3 flex flex-wrap gap-px">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={j}
                    className="w-1 h-1 rounded-sm bg-amber-700/60"
                    style={{ opacity: 0.4 + j * 0.15 }}
                  />
                ))}
              </div>
            ) : isBroken ? (
              <div className="flex gap-0.5">
                <div
                  className="w-2 h-3 rounded-sm"
                  style={{ background: "#b8964e", opacity: 0.7, transform: "rotate(-15deg)" }}
                />
                <div
                  className="w-2 h-3 rounded-sm"
                  style={{ background: "#c8a45e", opacity: 0.6, transform: "rotate(10deg)" }}
                />
              </div>
            ) : (
              <div
                className="w-5 h-3.5 rounded-full"
                style={{
                  background: variant === "enzymeease"
                    ? "linear-gradient(135deg, #f5d67a, #e8c558)"
                    : "linear-gradient(135deg, #d4a657, #c09040)",
                  boxShadow: variant === "enzymeease"
                    ? "0 0 4px rgba(34,197,94,0.3)"
                    : "none",
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ProcessSimulation() {
  const [sectionRef, inView] = useIntersectionObserver(0.15);
  const [activeStepTraditional, setActiveStepTraditional] = useState(0);
  const [activeStepEnzyme, setActiveStepEnzyme] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveStepTraditional((prev) => {
          if (prev < traditionalSteps.length - 1) return prev + 1;
          return prev;
        });
        setActiveStepEnzyme((prev) => {
          if (prev < enzymeEaseSteps.length - 1) return prev + 1;
          return prev;
        });
      }, 1200);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    const maxStep = Math.max(traditionalSteps.length, enzymeEaseSteps.length) - 1;
    if (activeStepTraditional >= maxStep && activeStepEnzyme >= maxStep) {
      setIsPlaying(false);
    }
  }, [activeStepTraditional, activeStepEnzyme]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setActiveStepTraditional(0);
    setActiveStepEnzyme(0);
  };

  return (
    <section
      id="process-simulation"
      ref={sectionRef}
      className="py-24 px-6 relative"
      style={{ background: "linear-gradient(180deg, #0a0f1a 0%, #080d18 100%)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">
            Interactive Simulation
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
            Process Comparison
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Step through each stage side-by-side — see exactly where traditional milling loses grain vs. where EnzymeEase preserves it.
          </p>

          {/* Control buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm transition-colors"
            >
              {isPlaying ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play Simulation
                </>
              )}
            </button>
            <button
              onClick={resetSimulation}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-border hover:border-sky-500/50 text-muted-foreground hover:text-white text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
        </motion.div>

        {/* Step selector */}
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => {
                setActiveStepTraditional(i);
                setActiveStepEnzyme(i);
              }}
              className={`w-8 h-2 rounded-full transition-all duration-300 ${
                activeStepTraditional === i
                  ? "bg-sky-500 w-12"
                  : "bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>

        {/* Side-by-side panels */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Traditional Milling */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-card rounded-3xl border border-red-500/20 p-6 overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <h3 className="font-bold text-white">Traditional Milling</h3>
              <span className="ml-auto text-xs text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                3–4 Passes
              </span>
            </div>

            <div className="space-y-3">
              {traditionalSteps.map((step, i) => (
                <motion.div
                  key={step.id}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    i === activeStepTraditional
                      ? "border-red-500/40 bg-red-500/10"
                      : i < activeStepTraditional
                      ? "border-border/50 bg-black/20 opacity-60"
                      : "border-border/20 opacity-30"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                        i <= activeStepTraditional ? "bg-red-500 text-white" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold text-white">{step.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-7">{step.description}</p>
                  {i === activeStepTraditional && (
                    <BreakageIndicator level={step.breakageLevel} color="red" />
                  )}
                </motion.div>
              ))}
            </div>

            <GrainVisualization
              breakageLevel={traditionalSteps[activeStepTraditional].breakageLevel}
              variant="traditional"
            />

            <div className="mt-4 flex justify-between text-xs">
              <span className="text-muted-foreground">Grain Loss</span>
              <span className="text-red-400 font-bold">~{traditionalSteps[activeStepTraditional].breakageLevel / 10}%</span>
            </div>
          </motion.div>

          {/* EnzymeEase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="bg-card rounded-3xl border border-emerald-500/30 p-6 overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <h3 className="font-bold text-white">EnzymeEase Process</h3>
              <span className="ml-auto text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                1–2 Passes
              </span>
            </div>

            <div className="space-y-3">
              {enzymeEaseSteps.map((step, i) => (
                <motion.div
                  key={step.id}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    i === activeStepEnzyme
                      ? "border-emerald-500/40 bg-emerald-500/10"
                      : i < activeStepEnzyme
                      ? "border-border/50 bg-black/20 opacity-60"
                      : "border-border/20 opacity-30"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                        i <= activeStepEnzyme ? "bg-emerald-500 text-white" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold text-white">{step.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-7">{step.description}</p>
                  {i === activeStepEnzyme && (
                    <BreakageIndicator level={step.breakageLevel} color="green" />
                  )}
                </motion.div>
              ))}
            </div>

            <GrainVisualization
              breakageLevel={enzymeEaseSteps[activeStepEnzyme].breakageLevel}
              variant="enzymeease"
            />

            <div className="mt-4 flex justify-between text-xs">
              <span className="text-muted-foreground">Grain Loss</span>
              <span className="text-emerald-400 font-bold">~{enzymeEaseSteps[activeStepEnzyme].breakageLevel / 10}%</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
