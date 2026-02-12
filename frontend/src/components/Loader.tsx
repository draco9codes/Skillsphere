import { motion } from "framer-motion";

interface ScanLoaderProps {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  color?: string;
  speed?: number;
  text?: string;
  showBorder?: boolean;
  variant?: "vertical" | "horizontal" | "radial";
}

export const ScanLoader = ({
  size = "md",
  color = "#5B8DB0",
  speed = 2,
  text,
  showBorder = true,
  variant = "vertical",
}: ScanLoaderProps) => {
  // Size mappings
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
    xl: "w-96 h-96",
    full: "w-full h-full",
  };

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} flex items-center justify-center`}
    >
      {/* Container with optional border */}
      <div
        className={`relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-xl ${
          showBorder ? "border-2" : ""
        }`}
        style={{
          background: `linear-gradient(135deg, ${hexToRgba(color, 0.1)}, ${hexToRgba(color, 0.05)})`,
          borderColor: showBorder ? hexToRgba(color, 0.3) : "transparent",
        }}
      >
        {/* Vertical Scan Effect */}
        {variant === "vertical" && (
          <motion.div
            className="absolute inset-x-0 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, ${hexToRgba(color, 0.6)} 50%, transparent 100%)`,
              height: "30%",
              filter: "blur(8px)",
            }}
            animate={{ y: ["0%", "300%", "0%"] }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Horizontal Scan Effect */}
        {variant === "horizontal" && (
          <motion.div
            className="absolute inset-y-0 pointer-events-none"
            style={{
              background: `linear-gradient(to right, transparent 0%, ${hexToRgba(color, 0.6)} 50%, transparent 100%)`,
              width: "30%",
              filter: "blur(8px)",
            }}
            animate={{ x: ["0%", "300%", "0%"] }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Radial Scan Effect */}
        {variant === "radial" && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${hexToRgba(color, 0.8)} 0%, transparent 60%)`,
              filter: "blur(20px)",
            }}
            animate={{
              scale: [0.3, 1.2, 0.3],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Corner Accents */}
        {showBorder && (
          <>
            {["top-left", "top-right", "bottom-left", "bottom-right"].map(
              (corner) => (
                <motion.div
                  key={corner}
                  className={`absolute w-6 h-6 ${
                    corner.includes("top") ? "top-2" : "bottom-2"
                  } ${corner.includes("left") ? "left-2" : "right-2"} ${
                    corner === "top-left"
                      ? "border-t-2 border-l-2"
                      : corner === "top-right"
                        ? "border-t-2 border-r-2"
                        : corner === "bottom-left"
                          ? "border-b-2 border-l-2"
                          : "border-b-2 border-r-2"
                  }`}
                  style={{ borderColor: color }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: speed * 0.8,
                    repeat: Infinity,
                    delay: corner === "top-left" ? 0 : 0.2,
                  }}
                />
              ),
            )}
          </>
        )}

        {/* Optional Text */}
        {text && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: speed * 0.6, repeat: Infinity }}
          >
            <p
              className="text-sm font-medium font-space-grotesk"
              style={{ color }}
            >
              {text}
            </p>
          </motion.div>
        )}

        {/* Animated Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(${hexToRgba(color, 0.3)} 1px, transparent 1px),
              linear-gradient(90deg, ${hexToRgba(color, 0.3)} 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: speed, repeat: Infinity }}
        />
      </div>

      {/* Outer Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl -z-10"
        style={{
          background: `radial-gradient(circle, ${hexToRgba(color, 0.4)}, transparent 70%)`,
        }}
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: speed * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
