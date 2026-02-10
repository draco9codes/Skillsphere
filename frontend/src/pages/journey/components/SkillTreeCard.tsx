import { type EnrolledTree } from "@/services/journeyService";
import { Calendar, Clock, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SkillTreeCardProps {
  tree: EnrolledTree;
}

export default function SkillTreeCard({ tree }: SkillTreeCardProps) {
  const navigate = useNavigate();
  const progressPercent = Number(tree.progressPercentage);

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
    <div
      onClick={() => navigate(`/tree/${tree.treeId}`)}
      className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden hover:scale-[1.02] hover:shadow-xl transition-all duration-200 cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={tree.thumbnailUrl}
          alt={tree.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${difficultyColors[tree.difficulty]}`}
          >
            {tree.difficulty}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${statusColors[tree.status]}`}
          >
            {tree.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-space-grotesk mb-2 line-clamp-1">
          {tree.title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
          {tree.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            <span>Progress</span>
            <span className="font-semibold text-[#5B8DB0] dark:text-[#7DA8C3]">
              {progressPercent.toFixed(0)}%
            </span>
          </div>
          <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
            <Zap className="w-4 h-4 text-[#FF7E5F] dark:text-[#FF9677]" />
            <span>{tree.xpEarned} XP</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
            <Clock className="w-4 h-4 text-[#4F9EAF] dark:text-[#6BB4C4]" />
            <span>{tree.estimatedHours}h</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
            <Calendar className="w-4 h-4 text-[#5B8DB0] dark:text-[#7DA8C3]" />
            <span>
              {tree.nodesCompleted}/{tree.totalNodes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
