import { Sidebar } from "./Sidebar";
import { useState } from "react";

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-gray-900 opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};
