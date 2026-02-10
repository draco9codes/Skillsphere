import { type Achievement } from "@/services/journeyService";
import * as LucideIcons from "lucide-react";

interface AchievementBadgeProps {
  achievement: Achievement;
}

export default function AchievementBadge({
  achievement,
}: AchievementBadgeProps) {
  const rarityColors = {
    COMMON: "from-gray-500 to-gray-600",
    RARE: "from-[#4F9EAF] to-cyan-600",
    EPIC: "from-[#5B8DB0] to-blue-600",
    LEGENDARY: "from-[#FF7E5F] to-orange-600",
  };

  const rarityGlow = {
    COMMON: "shadow-gray-500/20",
    RARE: "shadow-[#4F9EAF]/50",
    EPIC: "shadow-[#5B8DB0]/50",
    LEGENDARY: "shadow-[#FF7E5F]/70",
  };

  // Get Lucide icon dynamically
  const IconComponent =
    (LucideIcons as any)[achievement.iconName] || LucideIcons.Award;

  return (
    <div className="group relative">
      <div
        className={`bg-gradient-to-br ${rarityColors[achievement.rarity]} p-1 rounded-xl ${rarityGlow[achievement.rarity]} hover:scale-110 transition-all duration-200 cursor-pointer`}
      >
        <div className="bg-neutral-900 dark:bg-neutral-800 rounded-lg p-4 flex flex-col items-center">
          <IconComponent className="w-8 h-8 text-white mb-2" />
          <p className="text-white text-sm font-semibold text-center line-clamp-2 font-space-grotesk">
            {achievement.title}
          </p>
          <p className="text-[#FF7E5F] dark:text-[#FF9677] text-xs mt-1">
            +{achievement.xpReward} XP
          </p>
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        <div className="bg-neutral-800 dark:bg-neutral-700 border border-neutral-700 dark:border-neutral-600 rounded-lg p-3 shadow-xl whitespace-nowrap">
          <p className="text-white font-semibold text-sm">
            {achievement.title}
          </p>
          <p className="text-neutral-300 dark:text-neutral-400 text-xs mt-1">
            {achievement.description}
          </p>
          {achievement.unlockedDate && (
            <p className="text-[#5B8DB0] dark:text-[#7DA8C3] text-xs mt-1">
              Unlocked:{" "}
              {new Date(achievement.unlockedDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
