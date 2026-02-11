import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  projectService,
  type ProjectDetailDTO,
} from "@/services/projectService";
import { useAuth } from "@/routes/AuthContext";
import {
  Award,
  Clock,
  Users,
  TrendingUp,
  BookOpen,
  Lock,
  Unlock,
  ExternalLink,
  Play,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

const ProjectDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id ? Number(user.id) : undefined;

  const [project, setProject] = useState<ProjectDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [startingProject, setStartingProject] = useState(false);

  useEffect(() => {
    loadProjectDetail();
  }, [projectId, userId]);

  const loadProjectDetail = async () => {
    if (!projectId) return;

    try {
      setLoading(true);
      const data = await projectService.getProjectDetail(
        Number(projectId),
        userId,
      );
      setProject(data);
    } catch (error) {
      console.error("Failed to load project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartProject = async () => {
    if (!userId) {
      alert("Please login to start this quest!");
      // TODO: Trigger your login modal here
      return;
    }

    if (!projectId) return;

    try {
      setStartingProject(true);
      await projectService.startProject(Number(projectId), userId);
      await loadProjectDetail();
      alert("Quest started! Good luck! 🚀");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to start project");
    } finally {
      setStartingProject(false);
    }
  };

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

  const statusIcons = {
    IN_PROGRESS: <Play className="w-5 h-5 text-amber-500" />,
    SUBMITTED: <Clock className="w-5 h-5 text-blue-500" />,
    COMPLETED: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    REJECTED: <XCircle className="w-5 h-5 text-red-500" />,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        <div className="text-xl font-space-grotesk text-neutral-900 dark:text-white">
          Loading quest details...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mb-6">
          <XCircle className="w-10 h-10 text-neutral-400" />
        </div>
        <h2 className="text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white mb-4">
          Quest not found
        </h2>
        <button
          onClick={() => navigate("/projects")}
          className="px-6 py-3 bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
        >
          Back to Quest Board
        </button>
      </div>
    );
  }

  const hasStarted = !!project.userProgress;
  const isCompleted = project.userProgress?.status === "COMPLETED";

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#4F9EAF] rounded-full opacity-10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#5B8DB0] rounded-full opacity-10 blur-3xl animate-pulse [animation-delay:1s]" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Back Button */}
            <motion.button
              onClick={() => navigate("/projects")}
              className="mb-8 flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-[#5B8DB0] dark:hover:text-[#7DA8C3] transition-colors group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Quests</span>
            </motion.button>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Title & Info */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Difficulty & Type */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${difficultyBadgeColors[project.difficulty as keyof typeof difficultyBadgeColors]}`}
                  >
                    {project.difficulty}
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                    {project.projectType.replace("_", " ")}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk text-neutral-900 dark:text-white mb-6">
                  {project.title}
                </h1>

                {/* User Progress (if started) */}
                {hasStarted && project.userProgress && (
                  <motion.div
                    className="bg-gradient-to-r from-[#5B8DB0]/10 to-[#4F9EAF]/10 dark:from-[#5B8DB0]/20 dark:to-[#4F9EAF]/20 border border-[#5B8DB0]/30 rounded-xl p-5 mb-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {
                          statusIcons[
                            project.userProgress
                              .status as keyof typeof statusIcons
                          ]
                        }
                        <div>
                          <div className="font-semibold font-space-grotesk text-neutral-900 dark:text-white">
                            Your Progress
                          </div>
                          <div className="text-sm text-neutral-600 dark:text-neutral-400">
                            Status:{" "}
                            {project.userProgress.status.replace("_", " ")}
                          </div>
                        </div>
                      </div>
                      {isCompleted && project.userProgress.xpEarned && (
                        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 px-4 py-2 rounded-lg">
                          <Zap className="w-5 h-5 text-emerald-500" />
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            +{project.userProgress.xpEarned} XP
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Right: XP Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div
                  className={`bg-gradient-to-br ${difficultyColors[project.difficulty as keyof typeof difficultyColors]} rounded-2xl p-8 text-white text-center shadow-xl`}
                >
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="text-5xl font-bold font-space-grotesk mb-2">
                    {project.xpReward}
                  </div>
                  <div className="text-white/90 font-medium">XP Reward</div>
                </div>
              </motion.div>
            </div>

            {/* Action Button */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {!hasStarted ? (
                <button
                  onClick={handleStartProject}
                  disabled={startingProject || project.isLocked}
                  className={`w-full py-5 rounded-xl font-bold font-space-grotesk text-lg transition-all duration-300 ${
                    project.isLocked
                      ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white hover:shadow-xl hover:scale-[1.02]"
                  }`}
                >
                  {project.isLocked ? (
                    <span className="flex items-center justify-center gap-2">
                      <Lock className="w-5 h-5" />
                      Locked - Complete Prerequisites
                    </span>
                  ) : startingProject ? (
                    "Starting Quest..."
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Unlock className="w-5 h-5" />
                      Start Quest
                    </span>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => alert("Go to submission form - coming soon!")}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold font-space-grotesk text-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                >
                  Continue Quest →
                </button>
              )}
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <motion.div
                  className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#5B8DB0] to-[#4F9EAF] rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                      Quest Description
                    </h2>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg">
                    {project.description}
                  </p>
                </motion.div>

                {/* Categories */}
                <motion.div
                  className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                      Skills You'll Practice
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.categories.map((cat) => (
                      <span
                        key={cat}
                        className="px-4 py-2 bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-neutral-700 dark:to-neutral-600 border border-neutral-200 dark:border-neutral-600 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Resources */}
                {project.resourceLinks && project.resourceLinks.length > 0 && (
                  <motion.div
                    className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FF7E5F] to-rose-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                        Learning Resources
                      </h2>
                    </div>
                    <div className="space-y-3">
                      {project.resourceLinks.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl hover:border-[#5B8DB0] dark:hover:border-[#7DA8C3] hover:shadow-md transition-all duration-300 group"
                        >
                          <div>
                            <div className="font-semibold text-neutral-900 dark:text-white group-hover:text-[#5B8DB0] dark:group-hover:text-[#7DA8C3] transition-colors">
                              {resource.title}
                            </div>
                            <div className="text-sm text-neutral-600 dark:text-neutral-400 capitalize">
                              {resource.type}
                            </div>
                          </div>
                          <ExternalLink className="w-5 h-5 text-neutral-400 group-hover:text-[#5B8DB0] dark:group-hover:text-[#7DA8C3] transition-colors" />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Column - Stats */}
              <div className="space-y-6">
                {/* Stats Card */}
                <motion.div
                  className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 sticky top-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="font-bold text-lg font-space-grotesk text-neutral-900 dark:text-white mb-6">
                    Quest Stats
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          Estimated Time
                        </div>
                        <div className="font-bold text-neutral-900 dark:text-white">
                          {project.estimatedHours} hours
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          Total Attempts
                        </div>
                        <div className="font-bold text-neutral-900 dark:text-white">
                          {project.totalAttempts}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          Completed
                        </div>
                        <div className="font-bold text-emerald-600 dark:text-emerald-400">
                          {project.completedCount}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FF7E5F] to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          Avg. Completion
                        </div>
                        <div className="font-bold text-neutral-900 dark:text-white">
                          {project.averageCompletionTime > 0
                            ? `${Math.round(project.averageCompletionTime)}h`
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Prerequisites */}
                {project.prerequisiteProjectIds &&
                  project.prerequisiteProjectIds.length > 0 && (
                    <motion.div
                      className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        <h3 className="font-bold text-lg font-space-grotesk text-amber-900 dark:text-amber-300">
                          Prerequisites
                        </h3>
                      </div>
                      <p className="text-sm text-amber-800 dark:text-amber-400 mb-3">
                        Complete these quests first:
                      </p>
                      <div className="space-y-2">
                        {project.prerequisiteProjectIds.map((id) => (
                          <div
                            key={id}
                            className="text-sm font-semibold text-amber-700 dark:text-amber-300 bg-white/50 dark:bg-amber-900/30 px-3 py-2 rounded-lg"
                          >
                            Quest #{id}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
