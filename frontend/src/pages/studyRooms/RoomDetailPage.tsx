import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/routes/AuthContext";
import {
  studyRoomService,
  type StudyRoomDetailDTO,
  type RoomMessageDTO,
  type PostMessageRequest,
} from "@/services/studyRoomService";
import {
  ArrowLeft,
  Users,
  MessageSquare,
  Clock,
  Send,
  UserPlus,
  UserMinus,
  Settings,
  XCircle,
  Trash2,
  Crown,
  User,
  AlertCircle,
} from "lucide-react";

const RoomDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id ? Number(user.id) : undefined;

  const [roomDetail, setRoomDetail] = useState<StudyRoomDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [joiningRoom, setJoiningRoom] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      loadRoomDetail();
      // Auto-refresh messages every 5 seconds
      const interval = setInterval(() => {
        loadRoomDetail(true);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [id, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [roomDetail?.recentMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadRoomDetail = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const data = await studyRoomService.getRoomDetail(Number(id), userId);
      setRoomDetail(data);
      setError("");
    } catch (err: any) {
      console.error("Failed to load room:", err);
      setError("Failed to load room details");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!userId) {
      alert("Please log in to join rooms");
      navigate("/login");
      return;
    }

    try {
      setJoiningRoom(true);
      await studyRoomService.joinRoom(Number(id), userId);
      await loadRoomDetail();
      alert("Successfully joined the room!");
    } catch (err: any) {
      console.error("Failed to join room:", err);
      alert(err.message || "Failed to join room");
    } finally {
      setJoiningRoom(false);
    }
  };

  const handleLeaveRoom = async () => {
    if (!userId) return;

    if (!confirm("Are you sure you want to leave this room?")) return;

    try {
      const response = await studyRoomService.leaveRoom(Number(id), userId);
      await loadRoomDetail();
      alert(response.message);
    } catch (err: any) {
      console.error("Failed to leave room:", err);
      alert(err.message || "Failed to leave room");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageText.trim() || !userId) return;

    try {
      setSendingMessage(true);
      const request: PostMessageRequest = {
        message: messageText.trim(),
        messageType: "TEXT",
      };

      await studyRoomService.postMessage(Number(id), request, userId);
      setMessageText("");
      await loadRoomDetail(true); // Silent reload
    } catch (err: any) {
      console.error("Failed to send message:", err);
      alert(err.message || "Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  const handleDeleteMessage = async (messageId: number) => {
    if (!userId || !confirm("Delete this message?")) return;

    try {
      await studyRoomService.deleteMessage(messageId, userId);
      await loadRoomDetail(true);
    } catch (err: any) {
      console.error("Failed to delete message:", err);
      alert(err.message || "Failed to delete message");
    }
  };

  const handleCloseRoom = async () => {
    if (!userId || !confirm("Are you sure you want to close this room?"))
      return;

    try {
      await studyRoomService.closeRoom(Number(id), userId);
      await loadRoomDetail();
      alert("Room closed successfully");
    } catch (err: any) {
      console.error("Failed to close room:", err);
      alert(err.message || "Failed to close room");
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getMessageStyles = (message: RoomMessageDTO) => {
    if (message.messageType === "SYSTEM") {
      return "bg-neutral-100 dark:bg-neutral-700/50 text-neutral-600 dark:text-neutral-400 italic text-center";
    }
    if (message.messageType === "ANNOUNCEMENT") {
      return "bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500";
    }
    return "bg-white dark:bg-neutral-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        <div className="text-xl font-space-grotesk text-neutral-900 dark:text-white">
          Loading room...
        </div>
      </div>
    );
  }

  if (error || !roomDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl text-neutral-900 dark:text-white mb-4">
            {error}
          </p>
          <button
            onClick={() => navigate("/rooms")}
            className="px-6 py-3 bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white rounded-xl font-semibold"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  const {
    roomInfo,
    activeMembers,
    recentMessages,
    isUserMember,
    isUserCreator,
  } = roomDetail;

  const roomTypeColors = {
    TEACHING: "from-[#5B8DB0] to-[#4F9EAF]",
    DISCUSSION: "from-purple-500 to-pink-500",
  };

  const statusColors = {
    ACTIVE: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    SCHEDULED: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    CLOSED: "bg-red-500/10 text-red-600 dark:text-red-400",
    ARCHIVED: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/rooms")}
          className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-[#5B8DB0] dark:hover:text-[#7DA8C3] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Rooms
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Messages (Left/Center) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Room Header */}
            <motion.div
              className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        roomInfo.roomType === "TEACHING"
                          ? "bg-[#5B8DB0]/10 text-[#5B8DB0] border border-[#5B8DB0]/20"
                          : "bg-purple-500/10 text-purple-600 border border-purple-500/20"
                      }`}
                    >
                      {roomInfo.roomType === "TEACHING"
                        ? "🎓 Teaching"
                        : "💬 Discussion"}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[roomInfo.status]}`}
                    >
                      {roomInfo.status}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white mb-2">
                    {roomInfo.name}
                  </h1>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {roomInfo.description}
                  </p>
                  {roomInfo.topic && (
                    <div className="flex items-center gap-2 mt-3">
                      <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-medium">
                        {roomInfo.topic}
                      </span>
                      {roomInfo.category && (
                        <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-medium">
                          {roomInfo.category}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {isUserCreator && (
                    <>
                      <button
                        onClick={handleCloseRoom}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Close Room"
                      >
                        <XCircle className="w-5 h-5 text-red-500" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Join/Leave Button */}
              {userId && roomInfo.status === "ACTIVE" && (
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  {!isUserMember ? (
                    <button
                      onClick={handleJoinRoom}
                      disabled={joiningRoom || !roomInfo.hasSpace}
                      className="w-full py-3 bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <UserPlus className="w-5 h-5" />
                      {joiningRoom
                        ? "Joining..."
                        : roomInfo.hasSpace
                          ? "Join Room"
                          : "Room Full"}
                    </button>
                  ) : (
                    <button
                      onClick={handleLeaveRoom}
                      className="w-full py-3 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
                    >
                      <UserMinus className="w-5 h-5" />
                      Leave Room
                    </button>
                  )}
                </div>
              )}
            </motion.div>

            {/* Messages Section */}
            <motion.div
              className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Messages Header */}
              <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#5B8DB0]" />
                  <h2 className="text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white">
                    Messages
                  </h2>
                  <span className="text-sm text-neutral-500">
                    ({recentMessages.length})
                  </span>
                </div>
                <span className="text-xs text-neutral-500">
                  Auto-refreshes every 5s
                </span>
              </div>

              {/* Messages List */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                {recentMessages.length === 0 ? (
                  <div className="text-center py-20">
                    <MessageSquare className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
                    <p className="text-neutral-500 dark:text-neutral-400">
                      No messages yet
                    </p>
                    <p className="text-sm text-neutral-400 dark:text-neutral-500">
                      Be the first to start a conversation!
                    </p>
                  </div>
                ) : (
                  recentMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 ${getMessageStyles(message)}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {message.messageType === "SYSTEM" ? (
                        <p className="text-sm">{message.message}</p>
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-[#5B8DB0] to-[#4F9EAF] rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {message.username.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <span className="font-semibold text-neutral-900 dark:text-white">
                                  {message.username}
                                </span>
                                {message.userRole === "MENTOR" && (
                                  <span className="ml-2 px-2 py-0.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs rounded">
                                    Mentor
                                  </span>
                                )}
                                <span className="ml-2 text-xs text-neutral-500">
                                  {formatTime(message.createdAt)}
                                </span>
                              </div>
                            </div>
                            {message.canDelete && (
                              <button
                                onClick={() => handleDeleteMessage(message.id)}
                                className="p-1 hover:bg-red-500/10 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            )}
                          </div>
                          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed pl-10">
                            {message.message}
                          </p>
                        </>
                      )}
                    </motion.div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              {isUserMember && roomInfo.status === "ACTIVE" ? (
                <form
                  onSubmit={handleSendMessage}
                  className="p-6 border-t border-neutral-200 dark:border-neutral-700"
                >
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B8DB0]"
                    />
                    <button
                      type="submit"
                      disabled={!messageText.trim() || sendingMessage}
                      className="px-6 py-3 bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                      {sendingMessage ? "Sending..." : "Send"}
                    </button>
                  </div>
                </form>
              ) : !userId ? (
                <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 text-center">
                  <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                    Log in to send messages
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white rounded-lg font-semibold"
                  >
                    Log In
                  </button>
                </div>
              ) : !isUserMember ? (
                <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 text-center">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Join the room to send messages
                  </p>
                </div>
              ) : (
                <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 text-center">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Room is closed
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar - Members & Stats */}
          <div className="space-y-6">
            {/* Room Stats */}
            <motion.div
              className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white mb-4">
                Room Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Members
                  </span>
                  <span className="font-bold text-neutral-900 dark:text-white">
                    {roomInfo.currentParticipants}
                    {roomInfo.maxParticipants && `/${roomInfo.maxParticipants}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Messages
                  </span>
                  <span className="font-bold text-neutral-900 dark:text-white">
                    {roomInfo.totalMessages}
                  </span>
                </div>
                {isUserMember && (
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-700">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Your Study Time
                    </span>
                    <span className="font-bold text-[#5B8DB0] dark:text-[#7DA8C3]">
                      {roomDetail.userStudyTime} min
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Active Members */}
            <motion.div
              className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-[#5B8DB0]" />
                <h3 className="text-lg font-bold font-space-grotesk text-neutral-900 dark:text-white">
                  Active Members
                </h3>
                <span className="text-sm text-neutral-500">
                  ({activeMembers.length})
                </span>
              </div>
              <div className="space-y-2">
                {activeMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#5B8DB0] to-[#4F9EAF] rounded-full flex items-center justify-center text-white font-bold">
                      {member.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-900 dark:text-white">
                          {member.username}
                        </span>
                        {member.roomRole === "CREATOR" && (
                          <div className="relative group">
                            <Crown className="w-4 h-4 text-amber-500" />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Creator
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-neutral-500">
                        {member.totalStudyTime} min studied
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
