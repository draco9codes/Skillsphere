import Login from "@/components/login/Login";
import Toggle from "@/components/ui/toggle";
import { useAuth } from "@/utility/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { BellIcon, MoonIcon, SearchIcon, UserCircle } from "lucide-react";
import { useState, type FC, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const NavBar: FC = () => {
  const { user } = useAuth();
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  const handleJourneyClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      e.preventDefault();
      setLoginOpen(true);
    }
  };
  return (
    <>
      <div className="sticky top-0 z-50 w-full h-16 bg-[#edefee] dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="relative max-w-[1400px] mx-auto px-5 flex items-center h-full">
          {/* LEFT */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Skillsphere Logo"
              className="w-12 h-12 animate-pulse [animation-duration:2s] text-[#5b8db0]"
            />
            <div className="font-bold text-[#5b8db0] font-space-grotesk text-xl">
              <Link to="/">Skillsphere</Link>
            </div>
          </div>

          {/* CENTER (dead center) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-6 text-black dark:text-white">
            <Link
              to="/discover"
              className="
              relative inline-block px-2
              transform-gpu
              transition-all duration-300 ease-out
              hover:scale-125
              hover:text-[#5b8db0]
              hover:drop-shadow-[0_0_16px_rgba(91,141,176,1)]
              after:absolute after:left-1/2 after:-bottom-2
              after:h-[3px] after:w-0 after:bg-[#5b8db0]
              after:transition-all after:duration-300
              hover:after:left-0 hover:after:w-full
              font-['Space_Grotesk']"
            >
              Discover
            </Link>

            <Link
              onClick={handleJourneyClick}
              to="/journey"
              className="
              relative inline-block px-2
              transform-gpu
              transition-all duration-300 ease-out
              hover:scale-125
              hover:text-[#5b8db0]
              hover:drop-shadow-[0_0_16px_rgba(91,141,176,1)]
              after:absolute after:left-1/2 after:-bottom-2
              after:h-[3px] after:w-0 after:bg-[#5b8db0]
              after:transition-all after:duration-300
              hover:after:left-0 hover:after:w-full font-['Space_Grotesk']"
            >
              My Journey
            </Link>

            <Link
              to="/rooms"
              className="
              relative inline-block px-2
              transform-gpu
              transition-all duration-300 ease-out
              hover:scale-125
              hover:text-[#5b8db0]
              hover:drop-shadow-[0_0_16px_rgba(91,141,176,1)]
              after:absolute after:left-1/2 after:-bottom-2
              after:h-[3px] after:w-0 after:bg-[#5b8db0]
              after:transition-all after:duration-300
              hover:after:left-0 hover:after:w-full font-['Space_Grotesk']"
            >
              Study Rooms
            </Link>

            <Link
              to="/projects"
              className="
              relative inline-block px-2
              transform-gpu
              transition-all duration-300 ease-out
              hover:scale-125
              hover:text-[#5b8db0]
              hover:drop-shadow-[0_0_16px_rgba(91,141,176,1)]
              after:absolute after:left-1/2 after:-bottom-2
              after:h-[3px] after:w-0 after:bg-[#5b8db0]
              after:transition-all after:duration-300
              hover:after:left-0 hover:after:w-full font-['Space_Grotesk']"
            >
              Projects
            </Link>
          </div>

          {/* RIGHT */}
          <div className="ml-auto font-medium text-[#5b8db0] font-space-grotesk text-l flex items-center">
            <Toggle
              options={["Student", "Mentor"]}
              onChange={(val) => console.log(val)}
            />
            <SearchIcon className="ml-4" size={22} />
            <MoonIcon className="ml-4" size={22} />
            <BellIcon className="ml-4" size={22} />
            <UserCircle className="ml-4" size={22} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {loginOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Login
                onSubmit={() => setLoginOpen(false)}
                onClose={() => setLoginOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
