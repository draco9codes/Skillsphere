import SearchBar from "@/components/SearchBar";
import { Toast } from "@/components/toast/Toast";
import { useAuth } from "@/routes/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { MoonIcon, SearchIcon, SunIcon, Users } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Login from "@/components/login/Login";
import { useDarkMode } from "@/hooks/useDarkMode";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { UserProfileDropdown } from "./UserProfileDropdown";

type NavBarProps = {
  showLoginComponent: boolean;
  setShowLoginComponent: (v: boolean) => void;
  afterLoginPath: string;
  setAfterLoginPath: (p: string) => void;
};

const NavBar: FC<NavBarProps> = ({
  showLoginComponent,
  setShowLoginComponent,
  afterLoginPath,
  setAfterLoginPath,
}) => {
  const navigate = useNavigate();
  const [toastmessage, setToastmessage] = useState("");
  const { user, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    setLoginOpen(showLoginComponent);
  }, [showLoginComponent]);

  const [isNavMessage, setIsNavMessage] = useState(false);

  useEffect(() => {
    if (!isNavMessage) return;

    const id = window.setTimeout(() => {
      setIsNavMessage(false);
    }, 3000);

    return () => window.clearTimeout(id);
  }, [isNavMessage]);

  return (
    <>
      <div className="sticky top-0 z-50 w-full h-16 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="relative max-w-[1400px] mx-auto px-5 flex items-center h-full">
          {/* LEFT */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <img
              src={logo}
              alt="Skillsphere Logo"
              className="w-12 h-12 animate-pulse [animation-duration:2s]"
              style={{ color: "#5B8DB0" }}
            />
            <div className="relative font-bold text-[#5B8DB0] dark:text-[#7DA8C3] font-space-grotesk text-xl">
              <Link
                to="/"
                className="relative inline-block transition-colors duration-500 ease-in-out 
                 group-hover:text-[#4A748E] dark:group-hover:text-[#A5C3D5]
                 after:absolute after:left-0 after:-bottom-1 
                 after:h-[2px] after:w-0 after:bg-[#5B8DB0] dark:after:bg-[#7DA8C3]
                 after:transition-all after:duration-500 group-hover:after:w-full"
              >
                Skillsphere
              </Link>
            </div>
          </div>

          {/* CENTER (dead center) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-6 text-black dark:text-white">
            <Link
              to="/discover"
              className="relative inline-block px-2 transform-gpu transition-all duration-300 ease-out 
              hover:scale-125 hover:text-[#5B8DB0] dark:hover:text-[#7DA8C3]
              hover:drop-shadow-[0_0_16px_rgba(91,141,176,1)] 
              after:absolute after:left-1/2 after:-bottom-2 after:h-[3px] after:w-0 
              after:bg-[#5B8DB0] dark:after:bg-[#7DA8C3]
              after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full 
              font-['Space_Grotesk']"
            >
              Discover
            </Link>

            <Link
              to="/journey"
              className="relative inline-block px-2 transform-gpu transition-all duration-300 ease-out 
              hover:scale-125 hover:text-[#5B8DB0] dark:hover:text-[#7DA8C3]
              hover:drop-shadow-[0_0_16px_rgba(91,141,176,1)] 
              after:absolute after:left-1/2 after:-bottom-2 after:h-[3px] after:w-0 
              after:bg-[#5B8DB0] dark:after:bg-[#7DA8C3]
              after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full 
              font-['Space_Grotesk']"
            >
              My Journey
            </Link>

            <Link
              to="/rooms"
              className="relative inline-block px-2 transform-gpu transition-all duration-300 ease-out 
              hover:scale-125 hover:text-[#5B8DB0] dark:hover:text-[#7DA8C3]
              hover:drop-shadow-[0_0_16px_rgba(91,141,176,1)] 
              after:absolute after:left-1/2 after:-bottom-2 after:h-[3px] after:w-0 
              after:bg-[#5B8DB0] dark:after:bg-[#7DA8C3]
              after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full 
              font-['Space_Grotesk']"
            >
              Study Rooms
            </Link>

            <Link
              to="/projects"
              className="relative inline-block px-2 transform-gpu transition-all duration-300 ease-out 
              hover:scale-125 hover:text-[#5B8DB0] dark:hover:text-[#7DA8C3]
              hover:drop-shadow-[0_0_16px_rgba(91,141,176,1)] 
              after:absolute after:left-1/2 after:-bottom-2 after:h-[3px] after:w-0 
              after:bg-[#5B8DB0] dark:after:bg-[#7DA8C3]
              after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full 
              font-['Space_Grotesk']"
            >
              Projects
            </Link>
          </div>

          {/* RIGHT */}
          <div className="ml-auto flex items-center gap-2">
            {user && (
              <Link
                to="/rooms/my-rooms"
                className="px-3 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 
                 transition-all duration-200 flex items-center gap-2 font-medium text-[#5B8DB0] dark:text-[#7DA8C3] font-space-grotesk"
              >
                <Users size={18} />
                My Rooms
              </Link>
            )}

            <div className="relative">
              <SearchIcon
                className="cursor-pointer text-[#5B8DB0] dark:text-[#7DA8C3] hover:scale-110 transition-transform duration-200"
                size={22}
                onClick={() => setSearchOpen((prev) => !prev)}
              />
              {searchOpen && <SearchBar />}
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {isDark ? (
                <SunIcon
                  className="cursor-pointer text-neutral-500 hover:text-amber-400 hover:scale-110 transition-transform duration-200"
                  size={22}
                />
              ) : (
                <MoonIcon
                  className="cursor-pointer text-neutral-600 hover:text-[#5B8DB0] hover:scale-110 transition-transform duration-200"
                  size={22}
                />
              )}
            </button>

            {user ? (
              // LOGGED IN: Show Notifications + Profile
              <>
                <NotificationsDropdown />
                <UserProfileDropdown />
              </>
            ) : (
              // LOGGED OUT: Show Sign In button
              <motion.button
                onClick={() => {
                  setLoginOpen(true);
                  setShowLoginComponent(true);
                }}
                className="px-4 py-2 rounded-lg 
                         bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] 
                         dark:from-[#7DA8C3] dark:to-[#6BB4C4]
                         text-white font-['Space_Grotesk'] font-medium
                         shadow-md hover:shadow-lg 
                         transition-all duration-300 ease-in-out
                         hover:brightness-110 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <Toast
        open={isNavMessage}
        message={toastmessage}
        onClose={() => setIsNavMessage(false)}
      />

      <AnimatePresence>
        {loginOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setLoginOpen(false);
              setShowLoginComponent(false);
            }}
          >
            <motion.div
              className="relative w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Login
                onSubmit={() => {
                  setLoginOpen(false);
                  setShowLoginComponent(false);

                  setIsNavMessage(true);
                  setToastmessage("Login Successful");

                  const target = afterLoginPath || "/home";
                  navigate(target, { replace: true });

                  setAfterLoginPath("/home");
                }}
                onClose={() => {
                  setLoginOpen(false);
                  setShowLoginComponent(false);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
