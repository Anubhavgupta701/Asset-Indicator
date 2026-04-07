import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

type Rating = "high" | "medium" | "low" | "none";

type ComparisonRow = {
  metric: string;
  oil: { value: string; rating: Rating };
  steam: { value: string; rating: Rating };
  enzyme: { value: string; rating: Rating };
};

const rows: ComparisonRow[] = [
  {
    metric: "Loss Rate",
    oil:    { value: "8–12%", rating: "low" },
    steam:  { value: "6–9%", rating: "medium" },
    enzyme: { value: "4–5%", rating: "high" },
  },
  {
    metric: "Treatment Cost",
    oil:    { value: "₹80–120/100kg", rating: "medium" },
    steam:  { value: "₹150–200/100kg", rating: "low" },
    enzyme: { value: "₹100–130/100kg", rating: "high" },
  },
  {
    metric: "Milling Passes",
    oil:    { value: "3–4 passes", rating: "low" },
    steam:  { value: "2–3 passes", rating: "medium" },
    enzyme: { value: "1–2 passes", rating: "high" },
  },
  {
    metric: "Machine Wear",
    oil:    { value: "High", rating: "low" },
    steam:  { value: "Moderate", rating: "medium" },
    enzyme: { value: "Minimal", rating: "high" },
  },
  {
    metric: "Scalability",
    oil:    { value: "High", rating: "high" },
    steam:  { value: "Moderate", rating: "medium" },
    enzyme: { value: "High", rating: "high" },
  },
  {
    metric: "Food Safety Risk",
    oil:    { value: "Residue risk", rating: "low" },
    steam:  { value: "Low risk", rating: "medium" },
    enzyme: { value: "FSSAI-approved", rating: "high" },
  },
  {
    metric: "Energy Consumption",
    oil:    { value: "Moderate", rating: "medium" },
    steam:  { value: "High", rating: "low" },
    enzyme: { value: "Low", rating: "high" },
  },
  {
    metric: "Payback Period",
    oil:    { value: "6–12 months", rating: "medium" },
    steam:  { value: "8–14 months", rating: "low" },
    enzyme: { value: "2–3 months", rating: "high" },
  },
];

const ratingColors: Record<Rating, string> = {
  high: "text-emerald-400",
  medium: "text-yellow-400",
  low: "text-red-400",
  none: "text-muted-foreground",
};

const ratingDots: Record<Rating, number> = {
  high: 3,
  medium: 2,
  low: 1,
  none: 0,
};

function RatingDots({ rating }: { rating: Rating }) {
  const count = ratingDots[rating];
  const color = ratingColors[rating];
  return (
    <div className="flex gap-1 mt-1 justify-center">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < count ? color.replace("text-", "bg-") : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

export default function ComparisonTable() {
  const [sectionRef, inView] = useIntersectionObserver(0.1);

  return (
    <section
      id="comparison"
      ref={sectionRef}
      className="py-24 px-6 bg-background relative"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.3), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold text-sky-400 tracking-widest uppercase">
            Technology Comparison
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
            Oil vs. Steam vs. EnzymeEase
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            A rigorous, metric-by-metric breakdown of the three primary dal dehusking technologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-3xl border border-border overflow-hidden"
        >
          {/* Table header */}
          <div className="grid grid-cols-4 bg-card">
            <div className="p-5 text-left">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">Metric</span>
            </div>
            {[
              { name: "Oil Treatment", color: "text-yellow-400", bg: "border-yellow-500/20" },
              { name: "Steam Treatment", color: "text-blue-400", bg: "border-blue-500/20" },
              { name: "EnzymeEase", color: "text-emerald-400", bg: "border-emerald-500/20 bg-emerald-500/5" },
            ].map((method) => (
              <div
                key={method.name}
                className={`p-5 text-center border-l ${method.bg}`}
              >
                <p className={`text-sm font-bold ${method.color}`}>{method.name}</p>
              </div>
            ))}
          </div>

          {/* Table rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.metric}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              className={`grid grid-cols-4 border-t border-border ${
                i % 2 === 0 ? "bg-background" : "bg-card"
              }`}
            >
              <div className="p-4 flex items-center">
                <span className="text-sm font-medium text-white">{row.metric}</span>
              </div>

              {/* Oil */}
              <div className="p-4 text-center border-l border-border">
                <span className={`text-sm ${ratingColors[row.oil.rating]}`}>{row.oil.value}</span>
                <RatingDots rating={row.oil.rating} />
              </div>

              {/* Steam */}
              <div className="p-4 text-center border-l border-border">
                <span className={`text-sm ${ratingColors[row.steam.rating]}`}>{row.steam.value}</span>
                <RatingDots rating={row.steam.rating} />
              </div>

              {/* Enzyme — highlighted */}
              <div className="p-4 text-center border-l border-emerald-500/20 bg-emerald-500/5">
                <span className={`text-sm font-semibold ${ratingColors[row.enzyme.rating]}`}>
                  {row.enzyme.value}
                </span>
                <RatingDots rating={row.enzyme.rating} />
              </div>
            </motion.div>
          ))}

          {/* Summary row */}
          <div className="grid grid-cols-4 border-t border-border bg-card">
            <div className="p-5">
              <span className="text-sm font-bold text-white">Overall Rating</span>
            </div>
            {[
              { score: "5/10", color: "text-yellow-400" },
              { score: "6/10", color: "text-blue-400" },
              { score: "9/10", color: "text-emerald-400", highlight: true },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-5 text-center border-l border-border ${
                  item.highlight ? "bg-emerald-500/10 border-emerald-500/30" : ""
                }`}
              >
                <span className={`text-lg font-black ${item.color}`}>{item.score}</span>
                {item.highlight && (
                  <p className="text-xs text-emerald-400 mt-1">Recommended</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
