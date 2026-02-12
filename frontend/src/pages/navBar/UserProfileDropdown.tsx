import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  LogOut,
  Award,
  BookOpen,
  BarChart3,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/routes/AuthContext";
import { useNavigate } from "react-router-dom";

export const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsOpen(false);
  };

  const menuItems = [
    {
      icon: User,
      label: "My Profile",
      onClick: () => {
        navigate("/profile");
        setIsOpen(false);
      },
    },
    {
      icon: BookOpen,
      label: "My Learning",
      onClick: () => {
        navigate("/journey");
        setIsOpen(false);
      },
    },
    {
      icon: Award,
      label: "Achievements",
      onClick: () => {
        navigate("/achievements");
        setIsOpen(false);
      },
    },
    {
      icon: BarChart3,
      label: "Progress",
      onClick: () => {
        navigate("/progress");
        setIsOpen(false);
      },
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => {
        navigate("/settings");
        setIsOpen(false);
      },
    },
  ];

  // Get user initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5B8DB0] to-[#4F9EAF] flex items-center justify-center text-white font-bold text-sm shadow-lg">
          {getInitials(user?.name || "U")}
        </div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* User Info Header */}
            <div className="px-4 py-4 border-b border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-[#5B8DB0]/5 to-[#4F9EAF]/5 dark:from-[#5B8DB0]/10 dark:to-[#4F9EAF]/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5B8DB0] to-[#4F9EAF] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {getInitials(user?.name || "U")}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-neutral-900 dark:text-white truncate">
                    {user?.name}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* XP / Level (Optional) */}
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Level 5
                </span>
                <span className="text-[#5B8DB0] font-medium">1,250 XP</span>
              </div>
              <div className="mt-1 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF]"
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={item.onClick}
                  className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-left"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <item.icon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-neutral-200 dark:border-neutral-700 py-2">
              <motion.button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left group"
                whileHover={{ x: 4 }}
              >
                <LogOut className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-red-500 transition-colors" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-red-500 transition-colors">
                  Log Out
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
