import { type EnrolledTree } from "@/services/journeyService";
import SkillTreeCard from "./SkillTreeCard";

interface SkillTreeGridProps {
  trees: EnrolledTree[];
}

export default function SkillTreeGrid({ trees }: SkillTreeGridProps) {
  if (trees.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-12 text-center">
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          No active learning paths yet
        </p>
        <p className="text-neutral-500 dark:text-neutral-500 mt-2">
          Explore skill trees to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trees.map((tree) => (
        <SkillTreeCard key={tree.enrollmentId} tree={tree} />
      ))}
    </div>
  );
}
