import { type SkillTreeDetail } from "@/services/skillTreeService";

interface TreeProgressProps {
  tree: SkillTreeDetail;
}

export default function TreeProgress({ tree }: TreeProgressProps) {
  const progressPercent = Number(tree.progressPercentage);

  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-space-grotesk">
          Overall Progress
        </h3>
        <span className="text-2xl font-bold text-[#5B8DB0] dark:text-[#7DA8C3]">
          {progressPercent.toFixed(0)}%
        </span>
      </div>

      <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-600">
        <div
          className="h-full bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] transition-all duration-500 ease-out relative overflow-hidden"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
        <span>
          {tree.completedNodes} of {tree.totalNodes} nodes completed
        </span>
        <span>
          {tree.earnedXp} / {tree.totalXp} XP
        </span>
      </div>
    </div>
  );
}
