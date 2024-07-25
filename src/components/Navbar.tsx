import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiSun, FiMoon, FiSettings, FiUser } from "react-icons/fi";
import { GiCook } from "react-icons/gi";
import { useBoolean } from "@/hooks/use-boolean";
import useDarkMode from "@/hooks/use-dark-mode";
import Logout from "./Logout";
import Usercard from "./Usercard";

interface NavbarProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setIsSidebarOpen }) => {
  const pathname = usePathname();
  const { value: isProfileDropdownOpen, onToggle: toggleProfileDropdown } = useBoolean(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md ">
      <div className="max-w-8xl mx-auto px-3 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="sm:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
              type="button"
              aria-label="Open menu"
            >
              <FiMenu size={24} />
            </button>
            <Link href="/dashboard" className="flex-shrink-0 flex items-center">
              <GiCook className="text-xl sm:text-3xl text-blue-600 dark:text-blue-500 inline-block" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                RecipePlannerAI
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800"
              aria-label="Switch mode"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <Link
              href="/dashboard/settings"
              className={`p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800 ${
                pathname === "/dashboard/settings"
                  ? "bg-gray-100 dark:bg-gray-700"
                  : ""
              }`}
              aria-label="Settings"
            >
              <FiSettings size={20} />
            </Link>
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800"
                aria-label="User menu"
              >
                <FiUser size={20} />
              </button>
              {isProfileDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {/* <Usercard /> */}
                  <div className="py-1">
                    <Logout />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
