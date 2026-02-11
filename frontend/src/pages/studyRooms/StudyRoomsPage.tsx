import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/routes/AuthContext";
import {
  studyRoomService,
  type StudyRoomDTO,
  type RoomType,
} from "@/services/studyRoomService";
import {
  Users,
  MessageSquare,
  Filter,
  Search,
  Plus,
  Lock,
  Globe,
} from "lucide-react";

const StudyRoomsPage = () => {
  const [rooms, setRooms] = useState<StudyRoomDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterTopic, setFilterTopic] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyWithSpace, setShowOnlyWithSpace] = useState(false);

  const { user } = useAuth();
  const userId = user?.id ? Number(user.id) : undefined;

  useEffect(() => {
    loadRooms();
  }, [filterType, filterTopic, showOnlyWithSpace]);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const filters: any = {};

      if (filterType !== "ALL") {
        filters.type = filterType as RoomType;
      }
      if (filterTopic !== "ALL") {
        filters.topic = filterTopic;
      }
      if (showOnlyWithSpace) {
        filters.hasSpace = true;
      }

      const data = await studyRoomService.getAllRooms(filters);
      setRooms(data);
    } catch (error) {
      console.error("Failed to load rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadRooms();
      return;
    }

    try {
      setLoading(true);
      const data = await studyRoomService.getAllRooms({ search: searchQuery });
      setRooms(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique topics from rooms
  const allTopics = Array.from(
    new Set(rooms.map((r) => r.topic).filter(Boolean)),
  );

  // Client-side search filter
  const filteredRooms = searchQuery
    ? rooms.filter(
        (room) =>
          room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : rooms;

  const roomTypeColors = {
    TEACHING: "from-[#5B8DB0] to-[#4F9EAF]",
    DISCUSSION: "from-purple-500 to-pink-500",
  };

  const roomTypeBadgeColors = {
    TEACHING:
      "bg-[#5B8DB0]/10 text-[#5B8DB0] dark:text-[#7DA8C3] border-[#5B8DB0]/20",
    DISCUSSION:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  };

  const statusColors = {
    ACTIVE: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    SCHEDULED: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    CLOSED: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400",
    ARCHIVED: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        <div className="text-xl font-space-grotesk text-neutral-900 dark:text-white">
          Loading study rooms...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#5B8DB0] rounded-full opacity-10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl animate-pulse [animation-delay:1s]" />

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
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
                  Study Rooms
                </h1>
              </div>
              <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-6">
                Join collaborative learning spaces or create your own study
                group
              </p>

              {/* Create Room Button */}
              {userId && (
                <Link to="/rooms/create">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white rounded-xl font-semibold flex items-center gap-2 mx-auto hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-5 h-5" />
                    Create Room
                  </motion.button>
                </Link>
              )}
            </motion.div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-sm">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search rooms by name or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B8DB0]"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="px-6 py-3 bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                  <Filter className="w-5 h-5" />
                  <span className="font-semibold font-space-grotesk">
                    Filters:
                  </span>
                </div>

                {/* Room Type Filter */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#5B8DB0]"
                >
                  <option value="ALL">All Types</option>
                  <option value="TEACHING">🎓 Teaching</option>
                  <option value="DISCUSSION">💬 Discussion</option>
                </select>

                {/* Topic Filter */}
                <select
                  value={filterTopic}
                  onChange={(e) => setFilterTopic(e.target.value)}
                  className="px-4 py-2 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#5B8DB0]"
                >
                  <option value="ALL">All Topics</option>
                  {allTopics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>

                {/* Has Space Toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyWithSpace}
                    onChange={(e) => setShowOnlyWithSpace(e.target.checked)}
                    className="w-4 h-4 text-[#5B8DB0] border-neutral-300 rounded focus:ring-[#5B8DB0]"
                  />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Available spots only
                  </span>
                </label>

                <div className="ml-auto text-neutral-600 dark:text-neutral-400">
                  <span className="font-semibold text-[#5B8DB0] dark:text-[#7DA8C3]">
                    {filteredRooms.length}
                  </span>{" "}
                  rooms found
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link
                    to={`/rooms/${room.id}`}
                    className="block bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 hover:shadow-xl hover:border-[#5B8DB0]/50 dark:hover:border-[#7DA8C3]/50 transition-all duration-300 group h-full"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${roomTypeBadgeColors[room.roomType]}`}
                        >
                          {room.roomType === "TEACHING"
                            ? "🎓 Teaching"
                            : "💬 Discussion"}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[room.status]}`}
                        >
                          {room.status}
                        </span>
                      </div>
                      <div className="relative group">
                        {room.isPublic ? (
                          <Globe className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Lock className="w-4 h-4 text-amber-500" />
                        )}
                        <span className="absolute -top-8 right-0 px-2 py-1 bg-neutral-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {room.isPublic ? "Public" : "Private"}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white mb-3 group-hover:text-[#5B8DB0] dark:group-hover:text-[#7DA8C3] transition-colors line-clamp-2">
                      {room.name}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Topic/Category */}
                    {room.topic && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-medium">
                          {room.topic}
                        </span>
                        {room.category && (
                          <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-medium">
                            {room.category}
                          </span>
                        )}
                      </div>
                    )}

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

                    {/* Space indicator */}
                    {!room.hasSpace && (
                      <div className="mt-3 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-600 dark:text-amber-400 text-center">
                        Room is full
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredRooms.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-neutral-400" />
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-4">
                  No study rooms found
                </p>
                {userId && (
                  <Link to="/rooms/create">
                    <button className="px-6 py-3 bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                      Create the first room
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudyRoomsPage;
