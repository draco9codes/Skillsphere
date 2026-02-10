import { http } from "@/utility/HTTPUtility";

// ========================================
// TYPE DEFINITIONS
// ========================================

export interface UserProfile {
  profileId: number;
  userId: number;
  level: number;
  totalXp: number;
  currentXp: number;
  xpToNextLevel: number;
  avatarUrl?: string;
  userTitle: string;
  learningStreak: number;
  totalTimeSpent: number;
  achievementsCount: number;
}

export interface EnrolledTree {
  enrollmentId: number;
  treeId: number;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  totalNodes: number;
  nodesCompleted: number;
  progressPercentage: number;
  status: "ACTIVE" | "COMPLETED" | "PAUSED";
  enrollmentDate: string;
  lastAccessed: string;
  xpEarned: number;
  estimatedHours: number;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}

export interface Achievement {
  achievementId: number;
  title: string;
  description: string;
  iconName: string;
  xpReward: number;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  unlocked: boolean;
  unlockedDate?: string;
}

export interface Stats {
  totalTreesEnrolled: number;
  totalTreesCompleted: number;
  totalNodesCompleted: number;
  totalTimeSpentHours: number;
  currentStreak: number;
  longestStreak: number;
}

export interface JourneyDashboard {
  profile: UserProfile;
  enrolledTrees: EnrolledTree[];
  recentAchievements: Achievement[];
  stats: Stats;
}

// ========================================
// API FUNCTIONS
// ========================================

/**
 * Get complete dashboard data (everything for My Journey page)
 */
export const getDashboard = async (): Promise<JourneyDashboard> => {
  const response = await http.get<JourneyDashboard>("/journey/dashboard", {
    withCredentials: true,
  });
  return response;
};

/**
 * Get user profile only
 */
export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await http.get<UserProfile>("/journey/profile", {
    withCredentials: true,
  });
  return response;
};

/**
 * Get enrolled trees
 */
export const getEnrolledTrees = async (): Promise<EnrolledTree[]> => {
  const response = await http.get<EnrolledTree[]>("/journey/trees/enrolled", {
    withCredentials: true,
  });
  return response;
};

/**
 * Get all achievements with unlock status
 */
export const getAllAchievements = async (): Promise<Achievement[]> => {
  const response = await http.get<Achievement[]>("/journey/achievements", {
    withCredentials: true,
  });
  return response;
};

/**
 * Get unlocked achievements only
 */
export const getUnlockedAchievements = async (): Promise<Achievement[]> => {
  const response = await http.get<Achievement[]>(
    "/journey/achievements/unlocked",
    {
      withCredentials: true,
    },
  );
  return response;
};

/**
 * Enroll in a skill tree
 */
export const enrollInTree = async (treeId: number): Promise<EnrolledTree> => {
  const response = await http.post<EnrolledTree>(
    "/journey/trees/enroll",
    { treeId },
    { withCredentials: true },
  );
  return response;
};

/**
 * Create user profile (call this after signup)
 */
export const createProfile = async (): Promise<UserProfile> => {
  const response = await http.post<UserProfile>(
    "/journey/profile",
    {},
    { withCredentials: true },
  );
  return response;
};
