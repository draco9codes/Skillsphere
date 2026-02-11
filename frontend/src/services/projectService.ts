import { http } from "@/utility/HTTPUtility";

// API endpoints (no base URL since it's in http utility)
const PROJECTS_API = "/projects";

// TypeScript interfaces matching your DTOs
export interface ProjectDTO {
  id: number;
  title: string;
  description: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  projectType: "CODING_CHALLENGE" | "FULL_APPLICATION" | "DESIGN" | "CREATIVE";
  xpReward: number;
  estimatedHours: number;
  categories: string[];
  requiredSkillNodeId: number | null;
  isLocked: boolean;
  totalSubmissions: number;
  completionRate: number;
  createdAt: string;
}

export interface ProjectDetailDTO extends ProjectDTO {
  prerequisiteProjectIds: number[];
  resourceLinks: ResourceLink[];
  userProgress?: UserProjectProgress;
  totalAttempts: number;
  completedCount: number;
  averageCompletionTime: number;
}

export interface ResourceLink {
  title: string;
  url: string;
  type: string;
}

export interface UserProjectProgress {
  submissionId: number;
  status: string;
  githubUrl?: string;
  liveUrl?: string;
  xpEarned?: number;
  startedAt: string;
  submittedAt?: string;
  feedbackText?: string;
}

export interface ProjectSubmissionResponseDTO {
  id: number;
  projectId: number;
  projectTitle: string;
  userId: number;
  username: string;
  githubUrl?: string;
  liveUrl?: string;
  codeSnippet?: string;
  description?: string;
  status: string;
  isPublic: boolean;
  xpEarned?: number;
  feedbackText?: string;
  startedAt: string;
  submittedAt?: string;
  completedAt?: string;
}

// API Methods
export const projectService = {
  /**
   * Get all projects
   */
  getAllProjects: async (): Promise<ProjectDTO[]> => {
    return http.get<ProjectDTO[]>(PROJECTS_API);
  },

  /**
   * Filter by difficulty
   */
  getProjectsByDifficulty: async (
    difficulty: string,
  ): Promise<ProjectDTO[]> => {
    return http.get<ProjectDTO[]>(`${PROJECTS_API}?difficulty=${difficulty}`);
  },

  /**
   * Filter by type
   */
  getProjectsByType: async (type: string): Promise<ProjectDTO[]> => {
    return http.get<ProjectDTO[]>(`${PROJECTS_API}?type=${type}`);
  },

  /**
   * Filter by category
   */
  getProjectsByCategory: async (category: string): Promise<ProjectDTO[]> => {
    return http.get<ProjectDTO[]>(`${PROJECTS_API}?category=${category}`);
  },

  /**
   * Get project details
   * @param projectId - Project ID
   * @param userId - Optional user ID for personalized data
   */
  getProjectDetail: async (
    projectId: number,
    userId?: number,
  ): Promise<ProjectDetailDTO> => {
    const headers = userId ? { "X-User-Id": userId.toString() } : {};
    return http.get<ProjectDetailDTO>(`${PROJECTS_API}/${projectId}`, {
      headers,
    });
  },

  /**
   * Start a project (creates submission with IN_PROGRESS status)
   * @param projectId - Project to start
   * @param userId - User starting the project
   */
  startProject: async (
    projectId: number,
    userId: number,
  ): Promise<ProjectSubmissionResponseDTO> => {
    return http.post<ProjectSubmissionResponseDTO>(
      `${PROJECTS_API}/${projectId}/start`,
      {},
      { headers: { "X-User-Id": userId.toString() } },
    );
  },

  /**
   * Submit/update project work
   * @param submissionId - Submission to update
   * @param data - Submission data (GitHub URL, live URL, etc.)
   */
  submitProject: async (
    submissionId: number,
    data: {
      projectId: number;
      githubUrl?: string;
      liveUrl?: string;
      codeSnippet?: string;
      description?: string;
      isPublic?: boolean;
    },
  ): Promise<ProjectSubmissionResponseDTO> => {
    return http.put<ProjectSubmissionResponseDTO>(
      `${PROJECTS_API}/submissions/${submissionId}`,
      data,
    );
  },

  /**
   * Mark project as completed (awards XP)
   * @param submissionId - Submission to complete
   */
  completeProject: async (
    submissionId: number,
  ): Promise<ProjectSubmissionResponseDTO> => {
    return http.post<ProjectSubmissionResponseDTO>(
      `${PROJECTS_API}/submissions/${submissionId}/complete`,
      {},
    );
  },

  /**
   * Get user's all submissions
   * @param userId - User ID
   */
  getMySubmissions: async (
    userId: number,
  ): Promise<ProjectSubmissionResponseDTO[]> => {
    return http.get<ProjectSubmissionResponseDTO[]>(
      `${PROJECTS_API}/my-submissions`,
      { headers: { "X-User-Id": userId.toString() } },
    );
  },

  /**
   * Get public submissions for showcase
   */
  getPublicSubmissions: async (): Promise<ProjectSubmissionResponseDTO[]> => {
    return http.get<ProjectSubmissionResponseDTO[]>(`${PROJECTS_API}/showcase`);
  },
};
