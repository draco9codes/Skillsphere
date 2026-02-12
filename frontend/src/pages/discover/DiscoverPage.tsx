import { useEffect, useState } from "react";
import {
  getAllSkillTrees,
  enrollInTree,
  type SkillTreeSummary,
} from "@/services/discoverService";
import SkillTreeBrowseCard from "./components/SkillTreeBrowseCard";
import { Search, Filter, Loader2 } from "lucide-react";
import { ScanLoader } from "@/components/Loader";

export default function DiscoverPage() {
  const [trees, setTrees] = useState<SkillTreeSummary[]>([]);
  const [filteredTrees, setFilteredTrees] = useState<SkillTreeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");

  useEffect(() => {
    fetchTrees();
  }, []);

  useEffect(() => {
    filterTrees();
  }, [searchQuery, selectedCategory, selectedDifficulty, trees]);

  const fetchTrees = async () => {
    try {
      const data = await getAllSkillTrees();
      setTrees(data);
      setFilteredTrees(data);
    } catch (err: any) {
      console.error("Failed to load trees:", err);
      setError(err.message || "Failed to load skill trees");
    } finally {
      setLoading(false);
    }
  };

  const filterTrees = () => {
    let filtered = [...trees];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (tree) =>
          tree.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tree.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory !== "ALL") {
      filtered = filtered.filter((tree) => tree.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== "ALL") {
      filtered = filtered.filter(
        (tree) => tree.difficulty === selectedDifficulty,
      );
    }

    setFilteredTrees(filtered);
  };

  const handleEnroll = async (treeId: number) => {
    try {
      await enrollInTree(treeId);
      // Refresh to show enrolled status
      await fetchTrees();
    } catch (err: any) {
      alert(err.message || "Failed to enroll in tree");
    }
  };

  const categories = ["ALL", ...new Set(trees.map((t) => t.category))];
  const difficulties = ["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        <ScanLoader
          size="lg"
          text="Loading Skill Trees..."
          variant="radial"
          color="#5B8DB0"
          speed={2}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={fetchTrees}
            className="px-6 py-2 bg-[#5B8DB0] dark:bg-[#7DA8C3] text-white rounded-lg hover:bg-[#4A748E] dark:hover:bg-[#A5C3D5] transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white font-space-grotesk mb-2">
            Discover Skill Trees
          </h1>
          <p className="text-[#5B8DB0] dark:text-[#7DA8C3]">
            Explore and enroll in learning paths
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search skill trees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B8DB0] dark:focus:ring-[#7DA8C3]"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B8DB0] dark:focus:ring-[#7DA8C3]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "ALL" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B8DB0] dark:focus:ring-[#7DA8C3]"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff === "ALL" ? "All Difficulties" : diff}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            Showing {filteredTrees.length} of {trees.length} skill trees
          </div>
        </div>

        {/* Trees Grid */}
        {filteredTrees.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              No skill trees found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrees.map((tree) => (
              <SkillTreeBrowseCard
                key={tree.treeId}
                tree={tree}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
