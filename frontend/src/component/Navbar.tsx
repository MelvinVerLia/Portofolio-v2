import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useState } from "react";

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Navigation links
  const navLinks = [
    { name: "home", label: "Home", delay: 0.2 },
    { name: "projects", label: "Projects", delay: 0.4 },
    { name: "skills", label: "Skills", delay: 0.6 },
    { name: "contact", label: "Contact", delay: 0.8 }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#161630] py-4 shadow-lg shadow-indigo-900/30">
      <motion.nav 
        className="max-w-7xl mx-auto flex justify-between items-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-purple-500 to-purple-700 bg-clip-text text-transparent font-sans">
            Portolomeus 2.0
          </h1>
        </motion.div>

        <ul className="flex space-x-6 text-gray-200 font-medium">
          {navLinks.map((link) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: link.delay }}
              onHoverStart={() => setHoveredItem(link.name)}
              onHoverEnd={() => setHoveredItem(null)}
              className="relative"
            >
              <Link 
                to={link.name} 
                smooth={true} 
                duration={500} 
                className={`hover:cursor-pointer px-2 py-1 transition-colors duration-200 ${
                  hoveredItem === link.name 
                    ? "text-[#af62cf]" 
                    : "text-[#d981ff]"
                }`}
              >
                {link.label}

              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </header>
  );
};

export default Navbar;