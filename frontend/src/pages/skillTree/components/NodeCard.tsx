import { useState } from "react";
import { type TreeNode, completeNode } from "@/services/skillTreeService";
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Clock,
  Zap,
  Loader2,
  Trophy,
  FileText,
  Code,
  ClipboardCheck,
} from "lucide-react";

interface NodeCardProps {
  node: TreeNode;
  treeId: number;
  index: number;
  onComplete: (updatedProgress: number) => void;
}

export default function NodeCard({
  node,
  treeId,
  index,
  onComplete,
}: NodeCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [showXpAnimation, setShowXpAnimation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(node.isCompleted);

  const nodeTypeIcons = {
    LESSON: <BookOpen className="w-5 h-5" />,
    QUIZ: <ClipboardCheck className="w-5 h-5" />,
    PROJECT: <Code className="w-5 h-5" />,
    ASSESSMENT: <FileText className="w-5 h-5" />,
  };

  const nodeTypeColors = {
    LESSON:
      "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
    QUIZ: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30",
    PROJECT:
      "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
    ASSESSMENT:
      "bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30",
  };

  const handleComplete = async () => {
    if (node.isLocked || isCompleted || isCompleting) return;

    setIsCompleting(true);

    try {
      const response = await completeNode(treeId, node.nodeId);

      // Show XP animation
      setShowXpAnimation(true);
      setIsCompleted(true);

      // Hide animation after 2 seconds
      setTimeout(() => setShowXpAnimation(false), 2000);

      // Update parent progress
      onComplete(response.updatedProgress);

      // Show level up if needed
      if (response.leveledUp) {
        alert(`🎉 Level Up! You're now level ${response.newLevel}!`);
      }
    } catch (error: any) {
      console.error("Failed to complete node:", error);
      alert(error.message || "Failed to complete node");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div
      className={`
      relative bg-white dark:bg-neutral-800 border-2 rounded-xl p-5 transition-all duration-300
      ${
        isCompleted
          ? "border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/10"
          : node.isLocked
            ? "border-neutral-300 dark:border-neutral-700 opacity-60"
            : "border-neutral-200 dark:border-neutral-700 hover:border-[#5B8DB0] dark:hover:border-[#7DA8C3] hover:shadow-lg"
      }
    `}
    >
      {/* XP Animation Overlay */}
      {showXpAnimation && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#5B8DB0]/20 dark:bg-[#7DA8C3]/20 rounded-xl backdrop-blur-sm z-10 animate-fade-in">
          <div className="text-center animate-scale-in">
            <Trophy className="w-16 h-16 text-[#FF7E5F] dark:text-[#FF9677] mx-auto mb-2 animate-bounce" />
            <div className="text-3xl font-bold text-[#5B8DB0] dark:text-[#7DA8C3]">
              +{node.xpReward} XP
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Index Number */}
        <div
          className={`
          flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2
          ${
            isCompleted
              ? "bg-green-500 border-green-600 text-white"
              : node.isLocked
                ? "bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-500"
                : "bg-gradient-to-br from-[#5B8DB0] to-[#4F9EAF] border-[#5B8DB0] text-white"
          }
        `}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : node.isLocked ? (
            <Lock className="w-6 h-6" />
          ) : (
            index
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-space-grotesk mb-1">
                {node.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {node.description}
              </p>
            </div>

            <span
              className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${nodeTypeColors[node.nodeType]}`}
            >
              <span className="flex items-center gap-1">
                {nodeTypeIcons[node.nodeType]}
                {node.nodeType}
              </span>
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{node.estimatedMinutes} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-[#FF7E5F] dark:text-[#FF9677]" />
              <span className="font-semibold">{node.xpReward} XP</span>
            </div>
            {isCompleted && node.completedDate && (
              <div className="text-green-600 dark:text-green-400 font-semibold">
                ✓ Completed {new Date(node.completedDate).toLocaleDateString()}
              </div>
            )}
          </div>

          {/* Action Button */}
          {node.isLocked ? (
            <div className="text-sm text-neutral-500 dark:text-neutral-400 italic">
              🔒 Complete previous nodes to unlock
            </div>
          ) : isCompleted ? (
            <button
              disabled
              className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold opacity-50 cursor-not-allowed"
            >
              ✓ Completed
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] hover:from-[#4A748E] hover:to-[#3F7E8C] text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isCompleting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Completing...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Mark as Complete</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
