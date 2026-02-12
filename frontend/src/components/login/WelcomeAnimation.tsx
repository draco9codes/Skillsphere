import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface WelcomeAnimationProps {
  userName: string;
  onComplete?: () => void;
}

export const WelcomeAnimation = ({
  userName,
  onComplete,
}: WelcomeAnimationProps) => {
  const [phase, setPhase] = useState<"enter" | "show" | "exit">("enter");

  useEffect(() => {
    const showTimer = setTimeout(() => setPhase("show"), 700);
    const exitTimer = setTimeout(() => setPhase("exit"), 1800);
    const completeTimer = setTimeout(() => onComplete?.(), 2400);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Hexagonal particle grid
  const particles = Array.from({ length: 36 }).map((_, i) => {
    const angle = (i / 36) * Math.PI * 2;
    const radius = 250 + (i % 3) * 60;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      delay: i * 0.015,
      scale: 0.6 + Math.random() * 0.4,
    };
  });

  // Light rays
  const rays = Array.from({ length: 8 }).map((_, i) => ({
    rotate: (i / 8) * 360,
    delay: i * 0.05,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: phase === "exit" ? 0.4 : 0.2 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(15,23,42,0.95) 0%, rgba(0,0,0,0.98) 100%)",
        }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(91,141,176,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91,141,176,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Radial glow layers */}
      <motion.div
        className="absolute w-[1000px] h-[1000px]"
        style={{
          background:
            "radial-gradient(circle, rgba(91,141,176,0.25) 0%, rgba(79,158,175,0.15) 30%, transparent 60%)",
          filter: "blur(40px)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: phase === "exit" ? 1.8 : 1,
          opacity: phase === "exit" ? 0 : 0.8,
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Light rays emanating from center */}
      {rays.map((ray, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute w-1 h-[600px] origin-bottom"
          style={{
            background:
              "linear-gradient(to top, rgba(91,141,176,0.6), transparent)",
            filter: "blur(2px)",
            rotate: `${ray.rotate}deg`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: phase === "exit" ? 0 : [0, 1.2, 1],
            opacity: phase === "exit" ? 0 : [0, 0.6, 0.3],
          }}
          transition={{
            duration: 0.8,
            delay: ray.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Particle field */}
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${6 * particle.scale}px`,
            height: `${6 * particle.scale}px`,
            background:
              "radial-gradient(circle, rgba(91,141,176,1), rgba(79,158,175,0.6))",
            boxShadow: "0 0 15px rgba(91,141,176,0.8)",
          }}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: phase === "exit" ? particle.x * 1.8 : particle.x * 0.35,
            y: phase === "exit" ? particle.y * 1.8 : particle.y * 0.35,
            scale:
              phase === "exit" ? 0 : [0, particle.scale * 1.3, particle.scale],
            opacity: phase === "exit" ? 0 : [0, 1, 0.7],
          }}
          transition={{
            duration: phase === "exit" ? 0.6 : 0.8,
            delay: phase === "exit" ? particle.delay * 0.3 : particle.delay,
            ease: phase === "exit" ? "easeIn" : "easeOut",
          }}
        />
      ))}

      {/* Ripple waves */}
      {[1, 2, 3].map((wave) => (
        <motion.div
          key={`wave-${wave}`}
          className="absolute rounded-full border-2"
          style={{
            borderColor: `rgba(91,141,176,${0.4 / wave})`,
            width: "100px",
            height: "100px",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: phase === "exit" ? 10 : [0, 8, 7],
            opacity: phase === "exit" ? 0 : [0, 0.6, 0],
          }}
          transition={{
            duration: 1.5,
            delay: wave * 0.2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Main card */}
      <motion.div
        className="relative z-20"
        initial={{ scale: 0.3, opacity: 0, rotateY: -30 }}
        animate={{
          scale: phase === "exit" ? 0.85 : 1,
          opacity: phase === "exit" ? 0 : 1,
          rotateY: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 18,
          mass: 0.8,
        }}
        style={{ perspective: 1000 }}
      >
        {/* Glass card with advanced styling */}
        <motion.div
          className="relative px-20 py-14 rounded-3xl backdrop-blur-2xl border overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(91,141,176,0.12), rgba(79,158,175,0.08), rgba(61,109,141,0.12))",
            borderColor: "rgba(91,141,176,0.3)",
            boxShadow: `
              0 0 60px rgba(91,141,176,0.4),
              inset 0 0 60px rgba(91,141,176,0.05),
              0 20px 40px rgba(0,0,0,0.3)
            `,
          }}
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-60"
            style={{
              background: "linear-gradient(135deg, #5B8DB0, #4F9EAF, #5B8DB0)",
              padding: "2px",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Holographic scan effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(91,141,176,0.3) 50%, transparent 100%)",
              height: "30%",
            }}
            animate={{ y: ["0%", "300%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Corner accents */}
          {["top-left", "top-right", "bottom-left", "bottom-right"].map(
            (corner) => (
              <motion.div
                key={corner}
                className={`absolute w-8 h-8 border-[#5B8DB0] ${
                  corner.includes("top") ? "top-3" : "bottom-3"
                } ${corner.includes("left") ? "left-3" : "right-3"} ${
                  corner === "top-left"
                    ? "border-t-2 border-l-2"
                    : corner === "top-right"
                      ? "border-t-2 border-r-2"
                      : corner === "bottom-left"
                        ? "border-b-2 border-l-2"
                        : "border-b-2 border-r-2"
                }`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.7], scale: 1 }}
                transition={{
                  delay: 0.4 + (corner === "top-left" ? 0 : 0.05),
                  duration: 0.5,
                }}
              />
            ),
          )}

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Main title with shimmer */}
            <motion.div className="relative inline-block mb-4">
              <motion.h1
                className="text-7xl font-bold font-space-grotesk relative"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #5B8DB0 50%, #ffffff 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{
                  opacity: phase === "show" || phase === "exit" ? 1 : 0,
                  y: 0,
                  filter: "blur(0px)",
                  backgroundPosition: ["0% center", "200% center"],
                }}
                transition={{
                  opacity: { delay: 0.4, duration: 0.6 },
                  y: { delay: 0.4, duration: 0.6 },
                  filter: { delay: 0.4, duration: 0.6 },
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                Welcome Back
              </motion.h1>

              {/* Text glow */}
              <motion.div
                className="absolute inset-0 blur-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(91,141,176,0.6), rgba(79,158,175,0.6))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0.3] }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <span className="text-7xl font-bold font-space-grotesk">
                  Welcome Back
                </span>
              </motion.div>
            </motion.div>

            {/* Divider with animation */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-4"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-[#5B8DB0] to-transparent"
                style={{ width: "120px" }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-[#5B8DB0]"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-[#5B8DB0] to-transparent"
                style={{ width: "120px" }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </motion.div>

            {/* Username with typing effect */}
            <motion.div
              className="text-3xl font-medium text-white/95 tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: phase === "show" || phase === "exit" ? 1 : 0,
                y: 0,
              }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              {userName.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.05, duration: 0.2 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Inner radial pulse */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(91,141,176,0.15), transparent 60%)",
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.3, 1.5],
            }}
            transition={{
              duration: 2,
              times: [0, 0.5, 1],
              ease: "easeOut",
            }}
          />
        </motion.div>

        {/* Orbital elements */}
        {[1, 2].map((orbit) => (
          <motion.div
            key={`orbit-${orbit}`}
            className="absolute inset-0 rounded-full border border-white/5"
            style={{
              width: `${100 + orbit * 25}%`,
              height: `${100 + orbit * 25}%`,
              left: `${-orbit * 12.5}%`,
              top: `${-orbit * 12.5}%`,
            }}
            initial={{ scale: 0.5, opacity: 0, rotate: 0 }}
            animate={{
              scale: phase === "exit" ? 1.3 : 1,
              opacity: phase === "exit" ? 0 : [0, 0.4, 0.2],
              rotate: 360,
            }}
            transition={{
              scale: { duration: 0.8 },
              opacity: { duration: 1 },
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            }}
          >
            {/* Orbit particles */}
            <motion.div
              className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-[#5B8DB0]"
              style={{
                boxShadow: "0 0 10px rgba(91,141,176,0.8)",
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
