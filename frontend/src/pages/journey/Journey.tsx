import { useEffect, useState } from "react";
import { getDashboard, type JourneyDashboard } from "@/services/journeyService";
import ProfileCard from "./components/ProfileCard";
import SkillTreeGrid from "./components/SkillTreeGrid";
import AchievementsSection from "./components/AchievementsSection";
import StatsOverview from "./components/StatsOverview";
import { Loader2 } from "lucide-react";
import { ScanLoader } from "@/components/Loader";

export default function JourneyPage() {
  const [dashboard, setDashboard] = useState<JourneyDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (err: any) {
        console.error("Failed to load dashboard:", err);
        setError(err.message || "Failed to load your journey");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        <ScanLoader
          size="lg"
          text="Loading Your Journey..."
          variant="radial"
          color="#5B8DB0"
          speed={2}
        />
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">
            {error || "Failed to load dashboard"}
          </p>
          <button
            onClick={() => window.location.reload()}
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white font-space-grotesk mb-2">
            My Journey
          </h1>
          <p className="text-[#5B8DB0] dark:text-[#7DA8C3]">
            Track your progress and achievements
          </p>
        </div>

        {/* Profile Section */}
        <div className="mb-8">
          <ProfileCard profile={dashboard.profile} />
        </div>

        {/* Stats Overview */}
        <div className="mb-8">
          <StatsOverview stats={dashboard.stats} />
        </div>

        {/* Enrolled Trees */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white font-space-grotesk mb-4">
            Active Learning Paths
          </h2>
          <SkillTreeGrid trees={dashboard.enrolledTrees} />
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white font-space-grotesk mb-4">
            Recent Achievements
          </h2>
          <AchievementsSection achievements={dashboard.recentAchievements} />
        </div>
      </div>
    </div>
  );
}
