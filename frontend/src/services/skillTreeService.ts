import { http } from "@/utility/HTTPUtility";

export interface TreeNode {
  nodeId: number;
  title: string;
  description: string;
  nodeType: "LESSON" | "QUIZ" | "PROJECT" | "ASSESSMENT";
  xpReward: number;
  estimatedMinutes: number;
  orderIndex: number;
  isCompleted: boolean;
  isLocked: boolean;
  completedDate?: string;
  prerequisiteNodes: number[];
}

export interface SkillTreeDetail {
  treeId: number;
  title: string;
  description: string;
  category: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  thumbnailUrl: string;
  totalNodes: number;
  completedNodes: number;
  progressPercentage: number;
  totalXp: number;
  earnedXp: number;
  estimatedHours: number;
  nodes: TreeNode[];
  enrollmentId: number;
  enrollmentDate: string;
  status: "ACTIVE" | "COMPLETED" | "PAUSED";
}

export interface CompleteNodeResponse {
  success: boolean;
  xpEarned: number;
  newLevel?: number;
  leveledUp: boolean;
  updatedProgress: number;
  unlockedNodes: number[];
}

// Get detailed tree with all nodes
export const getTreeDetail = async (
  treeId: number,
): Promise<SkillTreeDetail> => {
  const response = await http.get<SkillTreeDetail>(`/trees/${treeId}/detail`, {
    withCredentials: true,
  });
  return response;
};

// Complete a node
export const completeNode = async (
  treeId: number,
  nodeId: number,
): Promise<CompleteNodeResponse> => {
  const response = await http.post<CompleteNodeResponse>(
    `/trees/${treeId}/nodes/${nodeId}/complete`,
    {},
    { withCredentials: true },
  );
  return response;
};

// Mark node as in progress
export const startNode = async (
  treeId: number,
  nodeId: number,
): Promise<void> => {
  await http.post(
    `/trees/${treeId}/nodes/${nodeId}/start`,
    {},
    { withCredentials: true },
  );
};
