import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Briefcase, User, Settings, LogOut, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../API/userApi";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/home" },
    { icon: Briefcase, label: "All Jobs", path: "/home" },
    { icon: User, label: "Profile", path: "/not-feature" },
    { icon: Settings, label: "Settings", path: "/not-feature" },
  ];

  return (
    <motion.aside
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      initial={false}
      animate={{ width: isExpanded ? 280 : 90 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="glass h-screen sticky top-0 flex flex-col p-4 overflow-hidden z-50 shadow-2xl"
    >
      <div className="flex items-center gap-4 mb-12 px-2 h-10">
        <div className="min-w-[40px] h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
          <Briefcase className="text-white" size={24} />
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-xl font-bold tracking-tight whitespace-nowrap overflow-hidden"
            >
              JobHunter AI
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between p-3 rounded-2xl transition-all group ${
                isActive 
                  ? "bg-accent text-white shadow-lg shadow-accent/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <div className="flex items-center gap-4">
              <div className="min-w-[32px] flex justify-center">
                <item.icon size={20} />
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {isExpanded && (
              <ChevronRight 
                size={16} 
                className="opacity-0 group-hover:opacity-100 transition-opacity" 
              />
            )}
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10">
        <button className="flex items-center gap-4 p-3 w-full rounded-2xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          onClick={() => logout()}
        >
          <div className="min-w-[32px] flex justify-center">
            <LogOut size={20} />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-medium whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

