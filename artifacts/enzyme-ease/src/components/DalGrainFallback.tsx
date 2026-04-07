import { motion } from "framer-motion";

// A pure CSS/SVG animated dal grain for environments where WebGL is unavailable
export default function DalGrainFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(14,165,233,0.15) 0%, rgba(34,197,94,0.08) 40%, transparent 70%)",
        }}
      />

      {/* Enzyme orbit particles */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? "#0ea5e9" : "#22c55e",
            boxShadow: `0 0 8px ${i % 2 === 0 ? "#0ea5e9" : "#22c55e"}`,
          }}
          animate={{
            rotate: [deg, deg + 360],
            x: [
              Math.cos((deg * Math.PI) / 180) * 90,
              Math.cos(((deg + 360) * Math.PI) / 180) * 90,
            ],
            y: [
              Math.sin((deg * Math.PI) / 180) * 55,
              Math.sin(((deg + 360) * Math.PI) / 180) * 55,
            ],
            opacity: [0.4, 1, 0.4],
            scale: [0.6, 1.2, 0.6],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Main dal grain SVG */}
      <motion.div
        animate={{
          rotateY: [0, 15, 0, -15, 0],
          rotateX: [0, 5, 0, -5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg
          width="140"
          height="100"
          viewBox="0 0 140 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Husk outer layer */}
          <motion.ellipse
            cx="70"
            cy="50"
            rx={62}
            ry={42}
            fill="url(#huskGrad)"
            stroke="url(#huskStroke)"
            strokeWidth="1"
          />

          {/* Inner cotyledon */}
          <motion.ellipse
            cx="70"
            cy="50"
            rx="48"
            ry="32"
            fill="url(#cotyledonGrad)"
            animate={{ opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Grain split line (cotyledon division) */}
          <motion.line
            x1="70"
            y1="20"
            x2="70"
            y2="80"
            stroke="rgba(200,160,80,0.4)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Surface texture highlight */}
          <ellipse cx="50" cy="38" rx="18" ry="8" fill="rgba(255,240,180,0.15)" />

          {/* Enzyme glow overlay */}
          <motion.ellipse
            cx="70"
            cy="50"
            rx="62"
            ry="42"
            fill="url(#enzymeGlow)"
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <defs>
            <radialGradient id="huskGrad" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#e8c87a" />
              <stop offset="50%" stopColor="#c8a060" />
              <stop offset="100%" stopColor="#8a6030" />
            </radialGradient>
            <linearGradient id="huskStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="cotyledonGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f5e090" />
              <stop offset="60%" stopColor="#d4a840" />
              <stop offset="100%" stopColor="#9a6820" />
            </radialGradient>
            <radialGradient id="enzymeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Husk separation animation */}
      <motion.div
        className="absolute"
        animate={{
          x: [-15, -30, -15],
          opacity: [0, 0.7, 0],
          rotate: [0, -20, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <svg width="30" height="22" viewBox="0 0 30 22" fill="none">
          <path d="M2 11 Q15 2 28 11 Q15 20 2 11Z" fill="rgba(180,130,60,0.6)" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute"
        animate={{
          x: [15, 30, 15],
          opacity: [0, 0.7, 0],
          rotate: [0, 20, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      >
        <svg width="30" height="22" viewBox="0 0 30 22" fill="none">
          <path d="M2 11 Q15 2 28 11 Q15 20 2 11Z" fill="rgba(180,130,60,0.6)" />
        </svg>
      </motion.div>

      {/* Phase label */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 text-center"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
      >
        <span className="text-xs text-sky-400 font-mono tracking-widest">Enzyme Bond Disruption</span>
      </motion.div>
    </div>
  );
}
