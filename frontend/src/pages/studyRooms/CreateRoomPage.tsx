import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/routes/AuthContext";
import {
  studyRoomService,
  type CreateRoomRequest,
  type RoomType,
} from "@/services/studyRoomService";
import { ArrowLeft, Users, Plus } from "lucide-react";

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id ? Number(user.id) : undefined;

  const [formData, setFormData] = useState<CreateRoomRequest>({
    name: "",
    description: "",
    roomType: "DISCUSSION",
    topic: "",
    category: "",
    maxParticipants: undefined,
    isPublic: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setError("You must be logged in to create a room");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const room = await studyRoomService.createRoom(formData, userId);

      // Redirect to the newly created room
      navigate(`/study-rooms/${room.id}`);
    } catch (err: any) {
      console.error("Failed to create room:", err);
      setError(err.message || "Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-4">
            Please log in to create a study room
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white rounded-xl font-semibold"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <div className="max-w-3xl mx-auto px-4 py-20">
        {/* Back Button */}
        <button
          onClick={() => navigate("/rooms")}
          className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-[#5B8DB0] dark:hover:text-[#7DA8C3] mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Study Rooms
        </button>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#5B8DB0] to-[#4F9EAF] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold font-space-grotesk text-neutral-900 dark:text-white mb-3">
            Create Study Room
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            Set up a new collaborative learning space
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Room Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Room Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., React Hooks Study Group"
              className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B8DB0]"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="What will you learn or discuss in this room?"
              rows={4}
              className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B8DB0] resize-none"
            />
          </div>

          {/* Room Type */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Room Type *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, roomType: "DISCUSSION" })
                }
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.roomType === "DISCUSSION"
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-neutral-200 dark:border-neutral-600"
                }`}
              >
                <div className="text-2xl mb-2">💬</div>
                <div className="font-semibold text-neutral-900 dark:text-white">
                  Discussion
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  Peer study group
                </div>
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, roomType: "TEACHING" })
                }
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.roomType === "TEACHING"
                    ? "border-[#5B8DB0] bg-[#5B8DB0]/10"
                    : "border-neutral-200 dark:border-neutral-600"
                }`}
              >
                <div className="text-2xl mb-2">🎓</div>
                <div className="font-semibold text-neutral-900 dark:text-white">
                  Teaching
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  Mentor-led session
                </div>
              </button>
            </div>
          </div>

          {/* Topic & Category */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Topic
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
                placeholder="e.g., Frontend"
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B8DB0]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="e.g., React"
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B8DB0]"
              />
            </div>
          </div>

          {/* Max Participants */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Max Participants (Optional)
            </label>
            <input
              type="number"
              min="2"
              value={formData.maxParticipants || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxParticipants: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              placeholder="Leave empty for unlimited"
              className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B8DB0]"
            />
          </div>

          {/* Public/Private */}
          <div className="mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={(e) =>
                  setFormData({ ...formData, isPublic: e.target.checked })
                }
                className="w-5 h-5 text-[#5B8DB0] border-neutral-300 rounded focus:ring-[#5B8DB0]"
              />
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white">
                  Public Room
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Anyone can discover and join this room
                </div>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Room..." : "Create Study Room"}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateRoomPage;
