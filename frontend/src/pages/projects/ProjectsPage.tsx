import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projectService, type ProjectDTO } from "@/services/projectService";
import { useAuth } from "@/routes/AuthContext";
import {
  Sword,
  Clock,
  Award,
  Users,
  TrendingUp,
  Zap,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [myProjects, setMyProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDifficulty, setFilterDifficulty] = useState<string>("ALL");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  const { user } = useAuth();
  const userId = user?.id ? Number(user.id) : undefined;

  useEffect(() => {
    loadProjects();
    if (userId) {
      loadMyProjects();
    }
  }, [filterDifficulty, userId]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      let data: ProjectDTO[];

      if (filterDifficulty === "ALL") {
        data = await projectService.getAllProjects();
      } else {
        data = await projectService.getProjectsByDifficulty(filterDifficulty);
      }

      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMyProjects = async () => {
    if (!userId) return;
    try {
      const data = await projectService.getMySubmissions(userId);
      const activeProjects = data.filter(
        (p: any) => p.status === "IN_PROGRESS" || p.status === "SUBMITTED",
      );
      setMyProjects(activeProjects.slice(0, 3));
    } catch (error) {
      console.error("Failed to load my projects:", error);
    }
  };

  const allCategories = Array.from(
    new Set(projects.flatMap((p) => p.categories)),
  );

  const filteredProjects =
    filterCategory === "ALL"
      ? projects
      : projects.filter((p) => p.categories.includes(filterCategory));

  const difficultyColors = {
    BEGINNER: "from-emerald-500 to-teal-500",
    INTERMEDIATE: "from-[#5B8DB0] to-[#4F9EAF]",
    ADVANCED: "from-purple-500 to-pink-500",
    EXPERT: "from-[#FF7E5F] to-rose-500",
  };

  const difficultyBadgeColors = {
    BEGINNER:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    INTERMEDIATE:
      "bg-[#5B8DB0]/10 text-[#5B8DB0] dark:text-[#7DA8C3] border-[#5B8DB0]/20",
    ADVANCED:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    EXPERT:
      "bg-[#FF7E5F]/10 text-[#FF7E5F] dark:text-[#FF9677] border-[#FF7E5F]/20",
  };

  const statusColors = {
    IN_PROGRESS: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    SUBMITTED: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    COMPLETED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        <div className="text-xl font-space-grotesk">Loading quests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#5B8DB0] rounded-full opacity-10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4F9EAF] rounded-full opacity-10 blur-3xl animate-pulse [animation-delay:1s]" />

      <div className="relative z-10">
        {/* Header */}
        <section className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#5B8DB0] to-[#4F9EAF] rounded-xl flex items-center justify-center">
                  <Sword className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                  Quest Board
                </h1>
              </div>
              <p className="text-xl text-neutral-600 dark:text-neutral-300">
                Choose your quest, build projects, and earn XP to level up your
                skills!
              </p>
            </motion.div>
          </div>
        </section>

        {/* ⭐ MY ACTIVE QUESTS - Only show if logged in */}
        {userId && myProjects.length > 0 && (
          <section className="py-8">
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                className="bg-gradient-to-r from-[#5B8DB0]/10 to-[#4F9EAF]/10 dark:from-[#5B8DB0]/20 dark:to-[#4F9EAF]/20 border border-[#5B8DB0]/20 dark:border-[#5B8DB0]/30 rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FF7E5F] to-rose-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                      My Active Quests
                    </h2>
                  </div>
                  <Link
                    to="/my-projects"
                    className="flex items-center gap-2 text-[#5B8DB0] dark:text-[#7DA8C3] hover:gap-3 transition-all duration-300 font-semibold"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {myProjects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/projects/${project.projectId}`}
                      className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-5 hover:shadow-lg hover:border-[#5B8DB0]/50 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold font-space-grotesk text-neutral-900 dark:text-white group-hover:text-[#5B8DB0] dark:group-hover:text-[#7DA8C3] transition-colors">
                          {project.projectTitle}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[project.status as keyof typeof statusColors]}`}
                        >
                          {project.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Started{" "}
                        {new Date(project.startedAt).toLocaleDateString()}
                      </p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                  <Filter className="w-5 h-5" />
                  <span className="font-semibold font-space-grotesk">
                    Filters:
                  </span>
                </div>

                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="px-4 py-2 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#5B8DB0] transition-all"
                >
                  <option value="ALL">All Levels</option>
                  <option value="BEGINNER">🟢 Beginner</option>
                  <option value="INTERMEDIATE">🔵 Intermediate</option>
                  <option value="ADVANCED">🟣 Advanced</option>
                  <option value="EXPERT">🟠 Expert</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#5B8DB0] transition-all"
                >
                  <option value="ALL">All Categories</option>
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <div className="ml-auto text-neutral-600 dark:text-neutral-400">
                  <span className="font-semibold text-[#5B8DB0] dark:text-[#7DA8C3]">
                    {filteredProjects.length}
                  </span>{" "}
                  quests available
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link
                    to={`/projects/${project.id}`}
                    className="block bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 hover:shadow-xl hover:border-[#5B8DB0]/50 dark:hover:border-[#7DA8C3]/50 transition-all duration-300 group h-full"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${difficultyBadgeColors[project.difficulty]}`}
                      >
                        {project.difficulty}
                      </span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                        {project.projectType.replace("_", " ")}
                      </span>
                    </div>

                    {/* Title with gradient underline on hover */}
                    <h3 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white mb-3 group-hover:text-[#5B8DB0] dark:group-hover:text-[#7DA8C3] transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.categories.slice(0, 3).map((cat) => (
                        <span
                          key={cat}
                          className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-medium"
                        >
                          {cat}
                        </span>
                      ))}
                      {project.categories.length > 3 && (
                        <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 rounded-lg text-xs">
                          +{project.categories.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 pt-5 border-t border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 bg-gradient-to-br ${difficultyColors[project.difficulty]} rounded-lg flex items-center justify-center`}
                        >
                          <Award className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400">
                            XP Reward
                          </div>
                          <div className="text-sm font-bold text-neutral-900 dark:text-white">
                            {project.xpReward}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400">
                            Duration
                          </div>
                          <div className="text-sm font-bold text-neutral-900 dark:text-white">
                            {project.estimatedHours}h
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400">
                            Attempts
                          </div>
                          <div className="text-sm font-bold text-neutral-900 dark:text-white">
                            {project.totalSubmissions}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400">
                            Success
                          </div>
                          <div className="text-sm font-bold text-neutral-900 dark:text-white">
                            {project.completionRate}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sword className="w-10 h-10 text-neutral-400" />
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                  No quests found with these filters
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectsPage;
