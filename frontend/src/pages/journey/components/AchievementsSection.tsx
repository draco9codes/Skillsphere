import { type Achievement } from "@/services/journeyService";
import AchievementBadge from "./AchievementBadge";

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export default function AchievementsSection({
  achievements,
}: AchievementsSectionProps) {
  if (achievements.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-12 text-center">
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          No achievements unlocked yet
        </p>
        <p className="text-neutral-500 dark:text-neutral-500 mt-2">
          Complete lessons to earn badges!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {achievements.map((achievement) => (
        <AchievementBadge
          key={achievement.achievementId}
          achievement={achievement}
        />
      ))}
    </div>
  );
}
