// export default function Navigation() {
//   return (
//     <nav className="w-full bg-[#F8FAFC]/95 backdrop-blur-sm border-b border-[#BCCCDC]/40 shadow-lg px-6 py-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-center relative">
//           <h1 className="text-3xl font-bold text-[#64748B]">ZAPPY</h1>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Gamepad2, Users } from "lucide-react";

export default function Navigation() {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: <Sparkles className="h-4 w-4" /> },
    { path: "/host", label: "Host", icon: <Gamepad2 className="h-4 w-4" /> },
    { path: "/join", label: "Join", icon: <Users className="h-4 w-4" /> },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#6D28D9]/80 via-[#9333EA]/70 to-[#C026D3]/80 backdrop-blur-md shadow-[0_0_20px_rgba(147,51,234,0.5)] border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center text-white">
        {/* Logo / Brand Name */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold tracking-wide"
        >
          <motion.span
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-[#FFD93D] drop-shadow-[0_0_15px_rgba(255,217,61,0.8)]"
          >
            ⚡
          </motion.span>
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            Zappy
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex space-x-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 transition-all ${
                  isActive
                    ? "text-yellow-300"
                    : "text-white/80 hover:text-yellow-200"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-300 rounded-full"
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
