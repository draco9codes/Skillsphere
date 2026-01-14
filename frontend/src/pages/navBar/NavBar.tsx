import Toggle from "@/components/ui/toggle";
import { MdTerminal } from "react-icons/md";
import { SearchIcon, MoonIcon, BellIcon, UserCircle } from "lucide-react";

function NavBar() {
  return (
    <div className="sticky top-0 z-50 w-full h-16 bg-[#edefee] dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-[1400px] mx-auto px-5 flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <MdTerminal
            className="animate-pulse [animation-duration:2s] text-[#5b8db0]"
            size={40}
          />
          <div className="font-bold text-[#5b8db0] font-space-grotesk text-xl">
            Skillsphere
          </div>
        </div>

        <div className="flex flex-row gap-5 text-black dark:text-white">
          <div>Discover</div>
          <div>My Journey</div>
          <div>Study Rooms</div>
          <div>Projects</div>
        </div>

        <div className="font-medium text-[#5b8db0] font-space-grotesk text-l">
          <Toggle
            options={["Student", "Mentor"]}
            onChange={(val) => console.log(val)}
          />
          <SearchIcon className="ml-4 inline-block" size={22} />
          <MoonIcon className="ml-4 inline-block" size={22} />
          <BellIcon className="ml-4 inline-block" size={22} />
          <UserCircle className="ml-4 inline-block" size={22} />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
