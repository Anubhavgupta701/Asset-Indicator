import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const steps = [
  {
    number: "01",
    title: "Enzyme Pre-treatment",
    subtitle: "Targeted Bond Disruption",
    description:
      "FSSAI-approved cellulase and hemicellulase enzymes are dissolved in water and uniformly applied to raw dal grains. The solution penetrates the outer husk layers, initiating selective hydrolysis of husk-cotyledon adhesion bonds.",
    highlight: "No heat. No chemicals. Fully food-safe.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: "sky",
  },
  {
    number: "02",
    title: "Controlled Incubation",
    subtitle: "4–8 Hour Rest Period",
    description:
      "Treated grains rest in ambient conditions for 4–8 hours. During this time, enzymatic activity progressively weakens the fibrous matrix holding the husk to the cotyledon.",
    highlight: "Zero energy input during incubation.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "purple",
  },
  {
    number: "03",
    title: "Reduced Milling Passes",
    subtitle: "1–2 Light Passes vs. 3–4 Traditional",
    description:
      "With bonds already weakened, the milling machine requires only 1–2 light passes instead of 3–4 aggressive ones.",
    highlight: "+50–60% loss reduction. Grade A recovery.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "emerald",
  },
];

export default function HowItWorks() {
  const [sectionRef, inView] = useIntersectionObserver(0.15);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 px-6 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-8">
          {steps.map((step, i) => {
            const colorMap = {
              sky: {
                border: "border-sky-500/30",
                bg: "bg-sky-500/10",
                text: "text-sky-400",
                icon: "bg-sky-500/20 text-sky-400",
                num: "text-sky-400/20",
              },
              purple: {
                border: "border-purple-500/30",
                bg: "bg-purple-500/10",
                text: "text-purple-400",
                icon: "bg-purple-500/20 text-purple-400",
                num: "text-purple-400/20",
              },
              emerald: {
                border: "border-emerald-500/30",
                bg: "bg-emerald-500/10",
                text: "text-emerald-400",
                icon: "bg-emerald-500/20 text-emerald-400",
                num: "text-emerald-400/20",
              },
            }[step.color] || {};

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative bg-card rounded-3xl border ${colorMap?.border || ""} p-8`}
              >
                <div className={`text-8xl ${colorMap?.num || ""}`}>
                  {step.number}
                </div>

                <div className={`w-14 h-14 ${colorMap?.icon || ""}`}>
                  {step.icon}
                </div>

                <div className={`text-xs ${colorMap?.text || ""}`}>
                  Stage {step.number}
                </div>

                <h3>{step.title}</h3>
                <p className={`${colorMap?.text || ""}`}>{step.subtitle}</p>

                <p>{step.description}</p>

                <div className={`${colorMap?.bg || ""} ${colorMap?.border || ""}`}>
                  <span className={`${colorMap?.text || ""}`}>
                    {step.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
