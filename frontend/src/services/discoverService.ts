import { http } from "@/utility/HTTPUtility";

export interface SkillTreeSummary {
  treeId: number;
  title: string;
  description: string;
  category: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  thumbnailUrl: string;
  totalNodes: number;
  estimatedHours: number;
  totalXp: number;
  isEnrolled: boolean;
}

export interface EnrollResponse {
  enrollmentId: number;
  treeId: number;
  enrollmentDate: string;
  status: string;
}

export const getAllSkillTrees = async (): Promise<SkillTreeSummary[]> => {
  const response = await http.get<SkillTreeSummary[]>("/trees/all", {
    withCredentials: true,
  });
  return response;
};

export const enrollInTree = async (treeId: number): Promise<EnrollResponse> => {
  const response = await http.post<EnrollResponse>(
    `/trees/${treeId}/enroll`,
    {},
    { withCredentials: true },
  );
  return response;
};
