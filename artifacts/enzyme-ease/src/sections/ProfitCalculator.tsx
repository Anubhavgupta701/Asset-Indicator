import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

function formatCrore(val: number): string {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  return `₹${val.toLocaleString("en-IN")}`;
}

function AnimatedStat({
  label,
  value,
  color,
  enabled,
}: {
  label: string;
  value: number;
  color: string;
  enabled: boolean;
}) {
  const count = useAnimatedCounter(Math.round(value / 1000), 1800, enabled);
  return (
    <div className="flex-1 min-w-48 bg-card rounded-2xl border border-border p-5 flex flex-col gap-2">
      <p className="text-xs text-muted-foreground uppercase tracking-widest">{label}</p>
      <p className={`text-2xl font-black font-mono-display ${color}`}>
        {formatCrore(count * 1000)}
      </p>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-white font-bold">{formatCrore(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function ProfitCalculator() {
  const [sectionRef, inView] = useIntersectionObserver(0.2);
  const [capacity, setCapacity] = useState(10);
  const [dalPrice, setDalPrice] = useState(90);
  const [enzymeCost, setEnzymeCost] = useState(120);
  const [reducedLoss, setReducedLoss] = useState(4.5);

  const workingDays = 300;
  const baseLossPct = 0.10;
  const reducedLossPct = reducedLoss / 100;

  const capacityKg = capacity * 1000;
  const currentAnnualLoss = Math.round(capacityKg * baseLossPct * workingDays * dalPrice);
  const newAnnualLoss = Math.round(capacityKg * reducedLossPct * workingDays * dalPrice);
  const annualEnzymeCost = Math.round((capacityKg / 100) * enzymeCost * workingDays);
  const netProfitIncrease = Math.max(0, currentAnnualLoss - newAnnualLoss - annualEnzymeCost);
  const paybackMonths = netProfitIncrease > 0 ? Math.max(0.5, (annualEnzymeCost / (netProfitIncrease / 12))).toFixed(1) : "N/A";

  const chartData = [
    { name: "Traditional Loss\n(per year)", value: currentAnnualLoss, fill: "#ef4444" },
    { name: "EnzymeEase Loss\n(per year)", value: newAnnualLoss, fill: "#0ea5e9" },
    { name: "Net Profit Gain\n(per year)", value: netProfitIncrease, fill: "#22c55e" },
  ];

  const profitCount = useAnimatedCounter(Math.round(netProfitIncrease / 1000), 1800, inView);
  const currentLossCount = useAnimatedCounter(Math.round(currentAnnualLoss / 1000), 1800, inView);
  const newLossCount = useAnimatedCounter(Math.round(newAnnualLoss / 1000), 1800, inView);

  return (
    <section
      id="profit-calculator"
      ref={sectionRef}
      className="py-24 px-6 relative bg-background"
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold text-sky-400 tracking-widest uppercase">
            Core Feature
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
            Interactive Profit Calculator
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Enter your mill parameters to see the exact annual profit impact of switching to EnzymeEase.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-card rounded-3xl border border-border p-8 space-y-8"
          >
            <h3 className="text-lg font-bold text-white">Mill Parameters</h3>

            {[
              {
                label: "Mill Capacity",
                unit: "t/day",
                value: capacity,
                min: 1,
                max: 100,
                step: 1,
                set: setCapacity,
                display: `${capacity} t/day`,
                color: "sky",
              },
              {
                label: "Dal Market Price",
                unit: "₹/kg",
                value: dalPrice,
                min: 40,
                max: 200,
                step: 5,
                set: setDalPrice,
                display: `₹${dalPrice}/kg`,
                color: "yellow",
              },
              {
                label: "Enzyme Cost",
                unit: "₹ per 100 kg",
                value: enzymeCost,
                min: 50,
                max: 500,
                step: 10,
                set: setEnzymeCost,
                display: `₹${enzymeCost}`,
                color: "purple",
              },
              {
                label: "Reduced Loss Target",
                unit: "% per 100 kg",
                value: reducedLoss,
                min: 2,
                max: 8,
                step: 0.5,
                set: setReducedLoss,
                display: `${reducedLoss}%`,
                color: "emerald",
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    {item.label}
                  </label>
                  <span
                    className={`text-sm font-bold ${
                      item.color === "sky"
                        ? "text-sky-400"
                        : item.color === "yellow"
                        ? "text-yellow-400"
                        : item.color === "purple"
                        ? "text-purple-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {item.display}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={item.min}
                    max={item.max}
                    step={item.step}
                    value={item.value}
                    onChange={(e) => item.set(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${
                        item.color === "sky"
                          ? "#0ea5e9"
                          : item.color === "yellow"
                          ? "#eab308"
                          : item.color === "purple"
                          ? "#a855f7"
                          : "#22c55e"
                      } ${((item.value - item.min) / (item.max - item.min)) * 100}%, #1e293b ${((item.value - item.min) / (item.max - item.min)) * 100}%)`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{item.min} {item.unit}</span>
                  <span className="text-xs text-muted-foreground">{item.max} {item.unit}</span>
                </div>
              </div>
            ))}

            {/* Assumptions note */}
            <div className="text-xs text-muted-foreground border-t border-border pt-4">
              Assumptions: 300 working days/year. Base loss: 10 kg per 100 kg (traditional). Enzyme cost applied daily per 100 kg processed.
            </div>
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="space-y-6"
          >
            {/* Big number */}
            <div className="bg-card rounded-3xl border border-emerald-500/30 p-8 text-center relative overflow-hidden glow-green">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  background: "radial-gradient(ellipse at center, #22c55e, transparent 70%)",
                }}
              />
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">
                Net Annual Profit Increase
              </p>
              <p className="text-5xl sm:text-6xl font-black text-emerald-400 font-mono-display text-glow-green">
                {formatCrore(profitCount * 1000)}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Payback Period:{" "}
                <span className="text-white font-semibold">{paybackMonths} months</span>
              </p>
            </div>

            {/* Loss breakdown */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-40 bg-card rounded-2xl border border-red-500/20 p-5">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Current Annual Loss</p>
                <p className="text-xl font-black text-red-400 font-mono-display mt-1">
                  {formatCrore(currentLossCount * 1000)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">at 10% loss rate</p>
              </div>
              <div className="flex-1 min-w-40 bg-card rounded-2xl border border-sky-500/20 p-5">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">EnzymeEase Loss</p>
                <p className="text-xl font-black text-sky-400 font-mono-display mt-1">
                  {formatCrore(newLossCount * 1000)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">at {reducedLoss}% loss rate</p>
              </div>
            </div>

            {/* Bar chart */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <p className="text-sm font-semibold text-muted-foreground mb-4">Annual Comparison (₹)</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} barSize={48}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
