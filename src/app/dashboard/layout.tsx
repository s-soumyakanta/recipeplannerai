"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useBoolean } from "@/hooks/use-boolean";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const sidebarOpen = useBoolean();

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar setIsSidebarOpen={sidebarOpen.onToggle} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSidebarOpen={sidebarOpen.value} setIsSidebarOpen={sidebarOpen.onFalse} />
        <main className="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-950 text-gray-900 dark:text-white w-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
