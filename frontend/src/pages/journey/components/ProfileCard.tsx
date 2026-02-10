import { type UserProfile } from "@/services/journeyService";
import { Award, Flame, Clock, Trophy } from "lucide-react";

interface ProfileCardProps {
  profile: UserProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const xpPercentage = (profile.currentXp / profile.xpToNextLevel) * 100;

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 dark:from-neutral-800 dark:to-neutral-800 backdrop-blur-lg border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-xl">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#5B8DB0] to-[#4F9EAF] flex items-center justify-center text-4xl font-bold text-white shadow-lg">
            {profile.level}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#FF7E5F] dark:bg-[#FF9677] text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            LVL {profile.level}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          {/* Title */}
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white font-space-grotesk mb-1">
            {profile.userTitle}
          </h2>
          <p className="text-[#5B8DB0] dark:text-[#7DA8C3] text-sm mb-4">
            User #{profile.userId}
          </p>

          {/* XP Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-300 mb-2">
              <span>XP Progress</span>
              <span className="font-semibold">
                {profile.currentXp} / {profile.xpToNextLevel} XP
              </span>
            </div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-600">
              <div
                className="h-full bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${xpPercentage}%` }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            <StatItem
              icon={<Trophy className="w-5 h-5" />}
              label="Total XP"
              value={profile.totalXp.toLocaleString()}
              color="text-[#FF7E5F] dark:text-[#FF9677]"
            />
            <StatItem
              icon={<Flame className="w-5 h-5" />}
              label="Streak"
              value={`${profile.learningStreak} days`}
              color="text-orange-500 dark:text-orange-400"
            />
            <StatItem
              icon={<Clock className="w-5 h-5" />}
              label="Time"
              value={`${Math.floor(profile.totalTimeSpent / 60)}h`}
              color="text-[#4F9EAF] dark:text-[#6BB4C4]"
            />
            <StatItem
              icon={<Award className="w-5 h-5" />}
              label="Achievements"
              value={profile.achievementsCount}
              color="text-[#5B8DB0] dark:text-[#7DA8C3]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="text-center">
      <div className={`${color} mx-auto mb-1`}>{icon}</div>
      <div className="text-neutral-900 dark:text-white font-bold text-lg">
        {value}
      </div>
      <div className="text-neutral-600 dark:text-neutral-400 text-xs">
        {label}
      </div>
    </div>
  );
}
