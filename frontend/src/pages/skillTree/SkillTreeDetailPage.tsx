import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTreeDetail,
  type SkillTreeDetail,
} from "@/services/skillTreeService";
import TreeHeader from "./components/TreeHeader";
import VisualSkillTree from "./components/VisualSkillTree";
import TreeProgress from "./components/TreeProgress";
import { Loader2, ArrowLeft, List, Network } from "lucide-react";
import TreeNodesList from "./components/TreeNodesList";

export default function SkillTreeDetailPage() {
  const { treeId } = useParams<{ treeId: string }>();
  const navigate = useNavigate();
  const [tree, setTree] = useState<SkillTreeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"visual" | "list">("visual");

  useEffect(() => {
    const fetchTree = async () => {
      if (!treeId) return;

      try {
        const data = await getTreeDetail(parseInt(treeId));
        setTree(data);
      } catch (err: any) {
        console.error("Failed to load tree:", err);
        setError(err.message || "Failed to load skill tree");
      } finally {
        setLoading(false);
      }
    };

    fetchTree();
  }, [treeId]);

  const handleNodeComplete = (updatedProgress: number) => {
    if (tree) {
      setTree({
        ...tree,
        progressPercentage: updatedProgress,
        completedNodes: tree.completedNodes + 1,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#5B8DB0] dark:text-[#7DA8C3] animate-spin mx-auto mb-4" />
          <p className="text-neutral-700 dark:text-neutral-300 text-lg">
            Loading skill tree...
          </p>
        </div>
      </div>
    );
  }

  if (error || !tree) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">
            {error || "Tree not found"}
          </p>
          <button
            onClick={() => navigate("/journey")}
            className="px-6 py-2 bg-[#5B8DB0] dark:bg-[#7DA8C3] text-white rounded-lg hover:bg-[#4A748E] dark:hover:bg-[#A5C3D5] transition"
          >
            Back to Journey
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/journey")}
          className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-[#5B8DB0] dark:hover:text-[#7DA8C3] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Journey</span>
        </button>

        {/* Tree Header */}
        <TreeHeader tree={tree} />

        {/* Progress Overview */}
        <div className="my-8">
          <TreeProgress tree={tree} />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white font-space-grotesk">
            Learning Path
          </h2>

          <div className="flex gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode("visual")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                viewMode === "visual"
                  ? "bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              <Network className="w-4 h-4" />
              <span className="font-semibold">Visual</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              <List className="w-4 h-4" />
              <span className="font-semibold">List</span>
            </button>
          </div>
        </div>

        {/* Tree View */}
        {viewMode === "visual" ? (
          <VisualSkillTree
            nodes={tree.nodes}
            treeId={tree.treeId}
            onNodeComplete={handleNodeComplete}
          />
        ) : (
          <TreeNodesList
            nodes={tree.nodes}
            treeId={tree.treeId}
            onNodeComplete={handleNodeComplete}
          />
        )}
      </div>
    </div>
  );
}
