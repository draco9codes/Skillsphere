import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/routes/AuthContext";
import {
  studyRoomService,
  type MyRoomsDashboardDTO,
  type StudyRoomDTO,
} from "@/services/studyRoomService";
import {
  Users,
  MessageSquare,
  Clock,
  TrendingUp,
  Crown,
  UserCheck,
  ArrowLeft,
  Plus,
  BarChart3,
} from "lucide-react";
import { ScanLoader } from "@/components/Loader";

const MyRoomsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id ? Number(user.id) : undefined;

  const [dashboard, setDashboard] = useState<MyRoomsDashboardDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    loadDashboard();
  }, [userId]);

  const loadDashboard = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const data = await studyRoomService.getMyRoomsDashboard(userId);
      setDashboard(data);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatStudyTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const roomTypeColors = {
    TEACHING: "from-[#5B8DB0] to-[#4F9EAF]",
    DISCUSSION: "from-purple-500 to-pink-500",
  };

  const roomTypeBadgeColors = {
    TEACHING: "bg-[#5B8DB0]/10 text-[#5B8DB0] border-[#5B8DB0]/20",
    DISCUSSION: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  };

  const statusColors = {
    ACTIVE: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    SCHEDULED: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    CLOSED: "bg-red-500/10 text-red-600 dark:text-red-400",
    ARCHIVED: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        <ScanLoader
          size="lg"
          text="Loading Your Rooms..."
          variant="radial"
          color="#5B8DB0"
          speed={2}
        />
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        <div className="text-center">
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-4">
            Failed to load dashboard
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

  const { stats, roomsCreated, roomsJoined } = dashboard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#5B8DB0] rounded-full opacity-10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl animate-pulse [animation-delay:1s]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/rooms")}
          className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-[#5B8DB0] dark:hover:text-[#7DA8C3] mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Browse Rooms
        </button>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#5B8DB0] to-[#4F9EAF] rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
              My Study Rooms
            </h1>
          </div>
          <p className="text-xl text-neutral-600 dark:text-neutral-300">
            Your learning journey and activity
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Rooms Created */}
          <motion.div
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#5B8DB0] to-[#4F9EAF] rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
              {stats.roomsCreated}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Rooms Created
            </div>
          </motion.div>

          {/* Rooms Joined */}
          <motion.div
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
              {stats.roomsJoined}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Total Rooms Joined
            </div>
          </motion.div>

          {/* Study Time */}
          <motion.div
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
              {formatStudyTime(stats.totalStudyTime)}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Total Study Time
            </div>
          </motion.div>

          {/* Messages Posted */}
          <motion.div
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <MessageSquare className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
              {stats.totalMessages}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Messages Posted
            </div>
          </motion.div>
        </div>

        {/* Rooms Created Section */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Crown className="w-6 h-6 text-[#5B8DB0]" />
              <h2 className="text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                Rooms I Created
              </h2>
              <span className="text-neutral-500">({roomsCreated.length})</span>
            </div>
            <Link to="/rooms/create">
              <button className="px-4 py-2 bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all">
                <Plus className="w-4 h-4" />
                Create New
              </button>
            </Link>
          </div>

          {roomsCreated.length === 0 ? (
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-12 text-center">
              <Crown className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                You haven't created any rooms yet
              </p>
              <Link to="/rooms/create">
                <button className="px-6 py-3 bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white rounded-xl font-semibold">
                  Create Your First Room
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roomsCreated.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </motion.section>

        {/* Rooms Joined Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
              Rooms I Joined
            </h2>
            <span className="text-neutral-500">({roomsJoined.length})</span>
          </div>

          {roomsJoined.length === 0 ? (
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-12 text-center">
              <Users className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                You haven't joined any rooms yet
              </p>
              <Link to="/rooms">
                <button className="px-6 py-3 bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white rounded-xl font-semibold">
                  Browse Rooms
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roomsJoined.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

// Room Card Component
const RoomCard = ({ room }: { room: StudyRoomDTO }) => {
  const roomTypeColors = {
    TEACHING: "from-[#5B8DB0] to-[#4F9EAF]",
    DISCUSSION: "from-purple-500 to-pink-500",
  };

  const roomTypeBadgeColors = {
    TEACHING: "bg-[#5B8DB0]/10 text-[#5B8DB0] border-[#5B8DB0]/20",
    DISCUSSION: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  };

  const statusColors = {
    ACTIVE: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    SCHEDULED: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    CLOSED: "bg-red-500/10 text-red-600 dark:text-red-400",
    ARCHIVED: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400",
  };

  return (
    <Link
      to={`/rooms/${room.id}`}
      className="block bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 hover:shadow-xl hover:border-[#5B8DB0]/50 dark:hover:border-[#7DA8C3]/50 transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${roomTypeBadgeColors[room.roomType]}`}
          >
            {room.roomType === "TEACHING" ? "🎓 Teaching" : "💬 Discussion"}
          </span>
        </div>
        <span
          className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[room.status]}`}
        >
          {room.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white mb-3 group-hover:text-[#5B8DB0] dark:group-hover:text-[#7DA8C3] transition-colors line-clamp-2">
        {room.name}
      </h3>

      {/* Description */}
      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 line-clamp-2 leading-relaxed">
        {room.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 bg-gradient-to-br ${roomTypeColors[room.roomType]} rounded-lg flex items-center justify-center`}
          >
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              Members
            </div>
            <div className="text-sm font-bold text-neutral-900 dark:text-white">
              {room.currentParticipants}
              {room.maxParticipants && `/${room.maxParticipants}`}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              Messages
            </div>
            <div className="text-sm font-bold text-neutral-900 dark:text-white">
              {room.totalMessages}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyRoomsPage;
