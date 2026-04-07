import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const trustPoints = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "FSSAI-Approved Enzymes",
    description:
      "All enzyme formulations used in the EnzymeEase system are compliant with FSSAI (Food Safety and Standards Authority of India) guidelines. Safe for direct contact with food grains — no residue, no chemical contamination.",
    badge: "Regulatory Compliant",
    color: "sky",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Indian Research Backing",
    description:
      "The enzymatic dehusking mechanism is validated by peer-reviewed Indian agricultural research, including the landmark study by Dabhi et al. on cellulase-assisted dal milling. Our parameters are derived from published experimental data.",
    badge: "Peer-Reviewed Research",
    color: "purple",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Designed for Lohia Industries",
    description:
      "EnzymeEase parameters — enzyme dosage, incubation time, milling speed — are calibrated for the operational profile of mills like Lohia Industries. Real-world data, not lab estimates.",
    badge: "Industry-Ready",
    color: "emerald",
  },
];

const colorMap = {
  sky: {
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    icon: "text-sky-400",
    badge: "text-sky-400 bg-sky-500/10 border-sky-500/30",
  },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    icon: "text-purple-400",
    badge: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    icon: "text-emerald-400",
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  },
};

export default function TrustSection() {
  const [sectionRef, inView] = useIntersectionObserver(0.15);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 relative"
      style={{ background: "linear-gradient(180deg, #080d18 0%, #0a0f1a 100%)" }}
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
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">Trust</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
            Built on Science. Validated for India.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Every claim in EnzymeEase is backed by regulatory approval, peer-reviewed research, or real mill data.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {trustPoints.map((point, i) => {
            const c = colorMap[point.color as keyof typeof colorMap];
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
                className={`bg-card rounded-3xl border ${c.border} p-8`}
              >
                <div className={`w-14 h-14 rounded-2xl ${c.bg} ${c.icon} flex items-center justify-center mb-6`}>
                  {point.icon}
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${c.badge} mb-4`}>
                  {point.badge}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Research citation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-card rounded-2xl border border-border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Primary Research Citation</p>
            <p className="text-sm text-white font-medium">
              Dabhi et al. — "Enzymatic Pre-treatment of Pigeon Pea for Improved Dehusking Efficiency"
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Journal of Food Science and Technology. Demonstrates 48–62% improvement in dehusking efficiency using cellulase enzyme treatment at optimized dosage.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
