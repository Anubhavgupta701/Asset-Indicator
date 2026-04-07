import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function FinalCTA() {
  const [sectionRef, inView] = useIntersectionObserver(0.2);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden bg-background"
    >
      {/* Large background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(14,165,233,0.12) 0%, rgba(34,197,94,0.06) 40%, transparent 70%)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-semibold text-sky-400 tracking-widest uppercase">
            Ready to Deploy
          </span>

          <h2 className="mt-4 text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-tight">
            Stop Losing Dal.{" "}
            <br />
            <span className="gradient-text-blue-green">Start Gaining Crores.</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every day your mill runs without EnzymeEase, you're leaving money in the dust — literally.
            A 10 t/day mill operating at 10% loss burns{" "}
            <span className="text-white font-semibold">₹1 Cr+ annually</span> that doesn't have to go.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >
          <a
            href="#profit-calculator"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-bold text-base transition-all duration-200 glow-blue"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Run Your Numbers
          </a>

          <a
            href="#timeline"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 font-bold text-base transition-all duration-200 hover:bg-emerald-500/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Start Pilot in 4 Weeks
          </a>
        </motion.div>

        {/* Trust micro-indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {[
            "FSSAI-Compliant Enzymes",
            "4-Week Pilot",
            "No Capital Expenditure",
            "Grade A Dal Recovery",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-muted-foreground">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
