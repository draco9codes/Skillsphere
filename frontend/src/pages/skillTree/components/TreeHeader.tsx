import { type SkillTreeDetail } from "@/services/skillTreeService";
import { Calendar, Clock, Trophy, Zap } from "lucide-react";

interface TreeHeaderProps {
  tree: SkillTreeDetail;
}

export default function TreeHeader({ tree }: TreeHeaderProps) {
  const difficultyColors = {
    BEGINNER:
      "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
    INTERMEDIATE:
      "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
    ADVANCED: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30",
  };

  const statusColors = {
    ACTIVE:
      "bg-[#4F9EAF]/20 text-[#4F9EAF] dark:text-[#6BB4C4] border-[#4F9EAF]/30",
    COMPLETED:
      "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
    PAUSED:
      "bg-neutral-500/20 text-neutral-600 dark:text-neutral-400 border-neutral-500/30",
  };

  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-xl">
      {/* Banner Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={tree.thumbnailUrl}
          alt={tree.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold border backdrop-blur-sm ${difficultyColors[tree.difficulty]}`}
          >
            {tree.difficulty}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold border backdrop-blur-sm ${statusColors[tree.status]}`}
          >
            {tree.status}
          </span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-4xl font-bold text-white font-space-grotesk mb-2">
            {tree.title}
          </h1>
          <p className="text-neutral-200 text-lg">{tree.description}</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="p-6 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatItem
            icon={<Zap className="w-5 h-5" />}
            label="XP Earned"
            value={`${tree.earnedXp} / ${tree.totalXp}`}
            color="text-[#FF7E5F] dark:text-[#FF9677]"
          />
          <StatItem
            icon={<Trophy className="w-5 h-5" />}
            label="Completed"
            value={`${tree.completedNodes} / ${tree.totalNodes}`}
            color="text-[#4F9EAF] dark:text-[#6BB4C4]"
          />
          <StatItem
            icon={<Clock className="w-5 h-5" />}
            label="Est. Time"
            value={`${tree.estimatedHours}h`}
            color="text-[#5B8DB0] dark:text-[#7DA8C3]"
          />
          <StatItem
            icon={<Calendar className="w-5 h-5" />}
            label="Category"
            value={tree.category}
            color="text-neutral-600 dark:text-neutral-400"
          />
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
    <div className="flex items-center gap-3">
      <div className={`${color}`}>{icon}</div>
      <div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {label}
        </div>
        <div className="text-lg font-bold text-neutral-900 dark:text-white">
          {value}
        </div>
      </div>
    </div>
  );
}
