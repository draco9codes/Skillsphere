import { type Stats } from "@/services/journeyService";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Flame,
  TreePine,
  Trophy,
} from "lucide-react";

interface StatsOverviewProps {
  stats: Stats;
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatCard
        icon={<TreePine className="w-6 h-6" />}
        label="Trees Enrolled"
        value={stats.totalTreesEnrolled}
        color="from-emerald-500 to-emerald-600"
      />
      <StatCard
        icon={<Trophy className="w-6 h-6" />}
        label="Trees Completed"
        value={stats.totalTreesCompleted}
        color="from-[#FF7E5F] to-orange-500"
      />
      <StatCard
        icon={<CheckCircle className="w-6 h-6" />}
        label="Nodes Completed"
        value={stats.totalNodesCompleted}
        color="from-[#4F9EAF] to-cyan-600"
      />
      <StatCard
        icon={<Clock className="w-6 h-6" />}
        label="Hours Learned"
        value={stats.totalTimeSpentHours}
        color="from-[#5B8DB0] to-blue-600"
      />
      <StatCard
        icon={<Flame className="w-6 h-6" />}
        label="Current Streak"
        value={`${stats.currentStreak} days`}
        color="from-orange-500 to-red-600"
      />
      <StatCard
        icon={<BookOpen className="w-6 h-6" />}
        label="Longest Streak"
        value={`${stats.longestStreak} days`}
        color="from-indigo-500 to-purple-600"
      />
    </div>
  );
}

function StatCard({
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
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 hover:scale-105 hover:shadow-lg transition-all duration-200">
      <div
        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3 shadow-md`}
      >
        {icon}
      </div>
      <div className="text-2xl font-bold text-neutral-900 dark:text-white font-space-grotesk mb-1">
        {value}
      </div>
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        {label}
      </div>
    </div>
  );
}
