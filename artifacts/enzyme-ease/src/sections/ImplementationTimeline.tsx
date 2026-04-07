import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const phases = [
  {
    id: "Phase 1",
    name: "Pilot Phase",
    weeks: "Weeks 1–4",
    weekRange: [1, 4],
    color: "sky",
    icon: "🔬",
    activities: [
      "Mill audit and baseline loss measurement",
      "Enzyme selection and dosage calibration",
      "Small-scale trial (500 kg batch)",
      "Data collection and quality assessment",
    ],
    milestone: "Pilot complete. Loss data benchmarked.",
  },
  {
    id: "Phase 2",
    name: "Validation Phase",
    weeks: "Weeks 5–10",
    weekRange: [5, 10],
    color: "purple",
    icon: "📊",
    activities: [
      "Scale-up trial (full production batch)",
      "Process parameter optimization",
      "FSSAI compliance documentation",
      "Cost-benefit analysis with real data",
    ],
    milestone: "Validated loss reduction confirmed. ROI locked in.",
  },
  {
    id: "Phase 3",
    name: "Full Rollout",
    weeks: "Weeks 11–16",
    weekRange: [11, 16],
    color: "emerald",
    icon: "🚀",
    activities: [
      "Full-scale deployment across all production lines",
      "Operator training and SOP documentation",
      "Quality monitoring system setup",
      "Ongoing enzyme supply chain management",
    ],
    milestone: "Full production at 4–5% loss rate. ₹1 Cr+ annual savings active.",
  },
];

const colorMap = {
  sky: {
    accent: "text-sky-400",
    border: "border-sky-500/40",
    bg: "bg-sky-500/10",
    dot: "bg-sky-400",
    bar: "bg-sky-500",
    badge: "text-sky-400 bg-sky-500/10 border-sky-500/30",
  },
  purple: {
    accent: "text-purple-400",
    border: "border-purple-500/40",
    bg: "bg-purple-500/10",
    dot: "bg-purple-400",
    bar: "bg-purple-500",
    badge: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  },
  emerald: {
    accent: "text-emerald-400",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    dot: "bg-emerald-400",
    bar: "bg-emerald-500",
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  },
};

export default function ImplementationTimeline() {
  const [sectionRef, inView] = useIntersectionObserver(0.15);
  const totalWeeks = 16;

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-24 px-6 relative"
      style={{ background: "linear-gradient(180deg, #080d18 0%, #0a0f1a 100%)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-purple-400 tracking-widest uppercase">Roadmap</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
            16-Week Implementation Roadmap
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            From first enzyme trial to full production — a structured, low-risk rollout designed for Indian dal mills.
          </p>
        </motion.div>

        {/* Gantt-style week bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card rounded-2xl border border-border p-6 mb-10"
        >
          <div className="flex justify-between text-xs text-muted-foreground mb-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="flex-1 text-center">W{i + 1}</span>
            ))}
          </div>
          <div className="relative h-8 rounded-lg overflow-hidden bg-secondary">
            {phases.map((phase, i) => {
              const start = ((phase.weekRange[0] - 1) / totalWeeks) * 100;
              const width = ((phase.weekRange[1] - phase.weekRange[0] + 1) / totalWeeks) * 100;
              const c = colorMap[phase.color as keyof typeof colorMap];

              return (
                <motion.div
                  key={phase.id}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
                  className={`absolute top-1 bottom-1 ${c.bar} rounded-md flex items-center justify-center`}
                  style={{ left: `${start}%`, width: `${width}%` }}
                >
                  <span className="text-xs font-bold text-white whitespace-nowrap px-2 truncate">
                    {phase.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Phase cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {phases.map((phase, i) => {
            const c = colorMap[phase.color as keyof typeof colorMap];
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className={`bg-card rounded-3xl border ${c.border} p-7`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold uppercase tracking-widest ${c.accent}`}>
                    {phase.id}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full border ${c.badge}`}>
                    {phase.weeks}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-5">{phase.name}</h3>

                <ul className="space-y-2.5 mb-6">
                  {phase.activities.map((activity, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                      <span className="text-sm text-muted-foreground">{activity}</span>
                    </li>
                  ))}
                </ul>

                <div className={`p-4 rounded-xl ${c.bg} border ${c.border}`}>
                  <p className={`text-xs font-semibold ${c.accent} mb-1`}>Milestone</p>
                  <p className="text-sm text-white">{phase.milestone}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
