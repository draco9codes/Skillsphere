import { http } from "@/utility/HTTPUtility";

// Base API path
const STUDY_ROOMS_API = "/study-rooms";

// ========================================
// TYPE DEFINITIONS
// ========================================

export type RoomType = "TEACHING" | "DISCUSSION";
export type RoomStatus = "SCHEDULED" | "ACTIVE" | "CLOSED" | "ARCHIVED";
export type RoomMemberRole = "CREATOR" | "MODERATOR" | "MEMBER";
export type MessageType = "TEXT" | "ANNOUNCEMENT" | "SYSTEM";

export interface StudyRoomDTO {
  id: number;
  name: string;
  description: string;
  roomType: RoomType;
  status: RoomStatus;
  topic: string;
  category: string;
  skillTreeId?: number;
  createdByUserId: number;
  createdByUsername: string;
  maxParticipants?: number;
  isPublic: boolean;
  currentParticipants: number;
  totalMessages: number;
  hasSpace: boolean;
  scheduledStart?: string;
  scheduledEnd?: string;
  actualStart?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoomMemberDTO {
  id: number;
  roomId: number;
  userId: number;
  username: string;
  userRole: string;
  roomRole: RoomMemberRole;
  isActive: boolean;
  totalStudyTime: number;
  joinedAt: string;
  leftAt?: string;
}

export interface RoomMessageDTO {
  id: number;
  roomId: number;
  userId: number;
  username: string;
  userRole: string;
  message: string;
  messageType: MessageType;
  isDeleted: boolean;
  canDelete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StudyRoomDetailDTO {
  roomInfo: StudyRoomDTO;
  activeMembers: RoomMemberDTO[];
  recentMessages: RoomMessageDTO[];
  isUserMember: boolean;
  isUserCreator: boolean;
  userStudyTime: number;
}

export interface CreateRoomRequest {
  name: string;
  description: string;
  roomType: RoomType;
  topic?: string;
  category?: string;
  skillTreeId?: number;
  maxParticipants?: number;
  isPublic?: boolean;
  scheduledStart?: string;
  scheduledEnd?: string;
}

export interface PostMessageRequest {
  message: string;
  messageType?: MessageType;
}

export interface JoinRoomResponse {
  roomId: number;
  membershipId: number;
  message: string;
}

export interface LeaveRoomResponse {
  roomId: number;
  studyTimeMinutes: number;
  message: string;
}

export interface MyRoomsStatsDTO {
  roomsCreated: number;
  roomsJoined: number;
  activeRooms: number;
  totalStudyTime: number;
  totalMessages: number;
}

export interface MyRoomsDashboardDTO {
  stats: MyRoomsStatsDTO;
  roomsCreated: StudyRoomDTO[];
  roomsJoined: StudyRoomDTO[];
}

// ========================================
// API METHODS
// ========================================

export const studyRoomService = {
  /**
   * Get all active rooms with optional filters
   */
  getAllRooms: async (filters?: {
    type?: RoomType;
    topic?: string;
    search?: string;
    hasSpace?: boolean;
  }): Promise<StudyRoomDTO[]> => {
    const params = new URLSearchParams();
    if (filters?.type) params.append("type", filters.type);
    if (filters?.topic) params.append("topic", filters.topic);
    if (filters?.search) params.append("search", filters.search);
    if (filters?.hasSpace !== undefined)
      params.append("hasSpace", String(filters.hasSpace));

    const queryString = params.toString();
    const url = queryString
      ? `${STUDY_ROOMS_API}?${queryString}`
      : STUDY_ROOMS_API;

    return http.get<StudyRoomDTO[]>(url);
  },

  /**
   * Get upcoming teaching rooms (scheduled)
   */
  getUpcomingRooms: async (): Promise<StudyRoomDTO[]> => {
    return http.get<StudyRoomDTO[]>(`${STUDY_ROOMS_API}/upcoming`);
  },

  /**
   * Get room detail
   */
  getRoomDetail: async (
    roomId: number,
    userId?: number,
  ): Promise<StudyRoomDetailDTO> => {
    const headers = userId ? { "X-User-Id": userId.toString() } : {};
    return http.get<StudyRoomDetailDTO>(`${STUDY_ROOMS_API}/${roomId}`, {
      headers,
    });
  },

  /**
   * Create a new room
   */
  createRoom: async (
    request: CreateRoomRequest,
    userId: number,
  ): Promise<StudyRoomDTO> => {
    return http.post<StudyRoomDTO>(STUDY_ROOMS_API, request, {
      headers: { "X-User-Id": userId.toString() },
    });
  },

  /**
   * Join a room
   */
  joinRoom: async (
    roomId: number,
    userId: number,
  ): Promise<JoinRoomResponse> => {
    return http.post<JoinRoomResponse>(
      `${STUDY_ROOMS_API}/${roomId}/join`,
      {},
      { headers: { "X-User-Id": userId.toString() } },
    );
  },

  /**
   * Leave a room
   */
  leaveRoom: async (
    roomId: number,
    userId: number,
  ): Promise<LeaveRoomResponse> => {
    return http.post<LeaveRoomResponse>(
      `${STUDY_ROOMS_API}/${roomId}/leave`,
      {},
      { headers: { "X-User-Id": userId.toString() } },
    );
  },

  /**
   * Get messages in a room
   */
  getRoomMessages: async (
    roomId: number,
    userId?: number,
  ): Promise<RoomMessageDTO[]> => {
    const headers = userId ? { "X-User-Id": userId.toString() } : {};
    return http.get<RoomMessageDTO[]>(`${STUDY_ROOMS_API}/${roomId}/messages`, {
      headers,
    });
  },

  /**
   * Post a message
   */
  postMessage: async (
    roomId: number,
    request: PostMessageRequest,
    userId: number,
  ): Promise<RoomMessageDTO> => {
    return http.post<RoomMessageDTO>(
      `${STUDY_ROOMS_API}/${roomId}/messages`,
      request,
      { headers: { "X-User-Id": userId.toString() } },
    );
  },

  /**
   * Delete a message
   */
  deleteMessage: async (messageId: number, userId: number): Promise<void> => {
    return http.delete<void>(`${STUDY_ROOMS_API}/messages/${messageId}`, {
      headers: { "X-User-Id": userId.toString() },
    });
  },

  /**
   * Update room
   */
  updateRoom: async (
    roomId: number,
    updates: Partial<CreateRoomRequest>,
    userId: number,
  ): Promise<StudyRoomDTO> => {
    return http.put<StudyRoomDTO>(`${STUDY_ROOMS_API}/${roomId}`, updates, {
      headers: { "X-User-Id": userId.toString() },
    });
  },

  /**
   * Close room
   */
  closeRoom: async (roomId: number, userId: number): Promise<StudyRoomDTO> => {
    return http.post<StudyRoomDTO>(
      `${STUDY_ROOMS_API}/${roomId}/close`,
      {},
      { headers: { "X-User-Id": userId.toString() } },
    );
  },

  /**
   * Get my rooms dashboard
   */
  getMyRoomsDashboard: async (userId: number): Promise<MyRoomsDashboardDTO> => {
    return http.get<MyRoomsDashboardDTO>(`${STUDY_ROOMS_API}/my-rooms`, {
      headers: { "X-User-Id": userId.toString() },
    });
  },

  /**
   * Get rooms I created
   */
  getMyCreatedRooms: async (userId: number): Promise<StudyRoomDTO[]> => {
    return http.get<StudyRoomDTO[]>(`${STUDY_ROOMS_API}/my-rooms/created`, {
      headers: { "X-User-Id": userId.toString() },
    });
  },

  /**
   * Get rooms I joined
   */
  getMyJoinedRooms: async (userId: number): Promise<StudyRoomDTO[]> => {
    return http.get<StudyRoomDTO[]>(`${STUDY_ROOMS_API}/my-rooms/joined`, {
      headers: { "X-User-Id": userId.toString() },
    });
  },
};
