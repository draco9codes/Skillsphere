import { type SkillTreeSummary } from "@/services/discoverService";
import { BookOpen, Clock, Zap, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface SkillTreeBrowseCardProps {
  tree: SkillTreeSummary;
  onEnroll: (treeId: number) => Promise<void>;
}

export default function SkillTreeBrowseCard({
  tree,
  onEnroll,
}: SkillTreeBrowseCardProps) {
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState(false);

  const difficultyColors = {
    BEGINNER:
      "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
    INTERMEDIATE:
      "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
    ADVANCED: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30",
  };

  const handleEnroll = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setEnrolling(true);
    try {
      await onEnroll(tree.treeId);
    } finally {
      setEnrolling(false);
    }
  };

  const handleCardClick = () => {
    if (tree.isEnrolled) {
      navigate(`/tree/${tree.treeId}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-200 ${tree.isEnrolled ? "cursor-pointer hover:scale-[1.02]" : ""}`}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={tree.thumbnailUrl}
          alt={tree.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />

        {/* Difficulty Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${difficultyColors[tree.difficulty as keyof typeof difficultyColors]}`}
          >
            {tree.difficulty}
          </span>
        </div>

        {/* Enrolled Badge */}
        {tree.isEnrolled && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Check className="w-3 h-3" />
            Enrolled
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2">
          <span className="text-xs font-semibold text-[#5B8DB0] dark:text-[#7DA8C3] uppercase tracking-wide">
            {tree.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-space-grotesk mb-2 line-clamp-1">
          {tree.title}
        </h3>

        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
          {tree.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 text-sm mb-4">
          <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
            <BookOpen className="w-4 h-4 text-[#5B8DB0] dark:text-[#7DA8C3]" />
            <span>{tree.totalNodes}</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
            <Clock className="w-4 h-4 text-[#4F9EAF] dark:text-[#6BB4C4]" />
            <span>{tree.estimatedHours}h</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
            <Zap className="w-4 h-4 text-[#FF7E5F] dark:text-[#FF9677]" />
            <span>{tree.totalXp} XP</span>
          </div>
        </div>

        {/* Action Button */}
        {tree.isEnrolled ? (
          <button className="w-full py-2 rounded-lg bg-[#5B8DB0] dark:bg-[#7DA8C3] text-white font-semibold hover:bg-[#4A748E] dark:hover:bg-[#A5C3D5] transition-colors">
            Continue Learning
          </button>
        ) : (
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white font-semibold hover:from-[#4A748E] hover:to-[#3F7E8C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enrolling ? "Enrolling..." : "Enroll Now"}
          </button>
        )}
      </div>
    </div>
  );
}
