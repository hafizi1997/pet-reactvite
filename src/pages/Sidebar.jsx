import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  ActivityIcon,
  MessageSquareIcon,
  FileTextIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: "Home", icon: <HomeIcon size={20} />, path: "/" },
    { name: "Pet Profile", icon: <UserIcon size={20} />, path: "/profile" },
    {
      name: "Symptom Input",
      icon: <ActivityIcon size={20} />,
      path: "/symptoms",
    },
    {
      name: "Vet AI Consultation",
      icon: <MessageSquareIcon size={20} />,
      path: "/consultation",
    },
    {
      name: "Treatment Recommendations",
      icon: <FileTextIcon size={20} />,
      path: "/recommendations",
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-500 hover:text-gray-600 focus:outline-none"
        >
          {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* App logo/title */}
          <div className="flex items-center justify-center h-16 border-b border-gray-100">
            <h1 className="text-xl font-semibold text-blue-500">
              Pet Health App
            </h1>
          </div>
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
          {/* User profile */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                <UserIcon size={20} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Pet Owner</p>
                <p className="text-xs text-gray-500">View Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
