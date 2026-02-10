import { useState } from "react";
import { Handle, Position } from "reactflow";
import { type TreeNode, completeNode } from "@/services/skillTreeService";
import {
  CheckCircle2,
  Lock,
  Zap,
  Clock,
  BookOpen,
  Code,
  ClipboardCheck,
  FileText,
  Loader2,
  Sparkles,
} from "lucide-react";

interface SkillNodeProps {
  data: {
    node: TreeNode;
    treeId: number;
    onComplete: (updatedProgress: number) => void;
  };
}

export default function SkillNode({ data }: SkillNodeProps) {
  const { node, treeId, onComplete } = data;
  const [isCompleting, setIsCompleting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const nodeTypeIcons = {
    LESSON: BookOpen,
    QUIZ: ClipboardCheck,
    PROJECT: Code,
    ASSESSMENT: FileText,
  };

  const nodeTypeColors = {
    LESSON: "from-blue-600 to-blue-800",
    QUIZ: "from-purple-600 to-purple-800",
    PROJECT: "from-green-600 to-green-800",
    ASSESSMENT: "from-orange-600 to-orange-800",
  };

  const Icon = nodeTypeIcons[node.nodeType] || BookOpen;

  const handleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.isLocked || node.isCompleted || isCompleting) return;

    setIsCompleting(true);
    try {
      const response = await completeNode(treeId, node.nodeId);
      onComplete(response.updatedProgress);

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
    <>
      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-[#5B8DB0]"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-[#5B8DB0]"
      />

      {/* Node Container */}
      <div
        className="relative group"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Glow Effect */}
        {!node.isLocked && !node.isCompleted && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#5B8DB0] to-[#4F9EAF] rounded-full blur-xl opacity-50 animate-pulse" />
        )}

        {/* Main Node Circle */}
        <div
          onClick={handleComplete}
          className={`
            relative w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center
            transition-all duration-300 cursor-pointer
            ${
              node.isCompleted
                ? "bg-gradient-to-br from-green-600 to-green-800 border-green-400 shadow-green-500/50"
                : node.isLocked
                  ? "bg-gradient-to-br from-neutral-700 to-neutral-900 border-neutral-600 opacity-60 cursor-not-allowed"
                  : `bg-gradient-to-br ${nodeTypeColors[node.nodeType]} border-[#5B8DB0] shadow-lg hover:scale-110 hover:shadow-2xl hover:shadow-[#5B8DB0]/50`
            }
          `}
        >
          {/* Icon */}
          <div className="relative">
            {node.isCompleted ? (
              <CheckCircle2 className="w-8 h-8 text-white" />
            ) : node.isLocked ? (
              <Lock className="w-8 h-8 text-neutral-400" />
            ) : isCompleting ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : (
              <Icon className="w-8 h-8 text-white" />
            )}
          </div>

          {/* XP Badge */}
          {!node.isLocked && (
            <div className="absolute -bottom-2 bg-[#FF7E5F] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {node.xpReward}
            </div>
          )}

          {/* Sparkle Effect for Available Nodes */}
          {!node.isLocked && !node.isCompleted && (
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-pulse" />
          )}
        </div>

        {/* Title Below Node */}
        <div className="mt-2 text-center">
          <p className="text-white text-xs font-semibold max-w-[120px] line-clamp-2">
            {node.title}
          </p>
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-neutral-800 border-2 border-neutral-700 rounded-lg p-4 shadow-2xl z-50 w-72 pointer-events-none">
            {/* Arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-neutral-800 border-l-2 border-t-2 border-neutral-700 rotate-45" />

            {/* Content */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-bold text-lg font-space-grotesk">
                  {node.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    node.nodeType === "LESSON"
                      ? "bg-blue-500/20 text-blue-400"
                      : node.nodeType === "QUIZ"
                        ? "bg-purple-500/20 text-purple-400"
                        : node.nodeType === "PROJECT"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-orange-500/20 text-orange-400"
                  }`}
                >
                  {node.nodeType}
                </span>
              </div>

              <p className="text-neutral-300 text-sm mb-3">
                {node.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-neutral-400 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{node.estimatedMinutes} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-[#FF7E5F]" />
                  <span className="text-[#FF7E5F] font-semibold">
                    {node.xpReward} XP
                  </span>
                </div>
              </div>

              {/* Status */}
              {node.isCompleted ? (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-2 text-green-400 text-sm font-semibold text-center">
                  ✓ Completed
                </div>
              ) : node.isLocked ? (
                <div className="bg-neutral-700/50 border border-neutral-600 rounded-lg p-2 text-neutral-400 text-sm text-center">
                  🔒 Complete previous nodes to unlock
                </div>
              ) : (
                <div className="bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] rounded-lg p-2 text-white text-sm font-semibold text-center">
                  Click to start!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
