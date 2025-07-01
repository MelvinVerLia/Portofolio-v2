import { motion } from "framer-motion";
import {
  SiReact,
  SiTailwindcss,
  SiShadcnui,
  SiNodedotjs,
  SiPostgresql,
  SiTypescript,
  SiGithub,
  SiExpress,
} from "react-icons/si";

const SkillsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const skillCategories = [
    {
      name: "Frontend",
      color: "from-indigo-500 to-blue-600",
      skills: [
        { name: "React", icon: <SiReact className="text-blue-400" /> },
        {
          name: "TailwindCSS",
          icon: <SiTailwindcss className="text-cyan-400" />,
        },
        { name: "ShadCN UI", icon: <SiShadcnui className="text-gray-300" /> },
        {
          name: "TypeScript",
          icon: <SiTypescript className="text-blue-500" />,
        },
      ],
    },
    {
      name: "Backend",
      color: "from-green-500 to-emerald-600",
      skills: [
        { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="text-blue-400" />,
        },
        {
          name: "Express.js",
          icon: <SiExpress className="text-blue-400" />,
        },
      ],
    },
    {
      name: "Tools",
      color: "from-purple-500 to-pink-600",
      skills: [
        { name: "GitHub", icon: <SiGithub className="text-orange-400" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="px-6 py-20 max-w-6xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-2 text-purple-400">
          Technologies I've Used
        </h2>
        <div className="h-0.5 w-16 bg-gradient-to-r from-purple-600 to-pink-500 mb-10"></div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        className="space-y-10"
      >
        {skillCategories.map((category, index) => (
          <motion.div key={index} variants={fadeIn} className="relative">
            <div className="mb-4 flex items-center">
              <h3 className="text-xl font-semibold text-gray-200">
                {category.name}
              </h3>
              <div
                className={`h-px flex-grow ml-4 bg-gradient-to-r ${category.color} opacity-50`}
              ></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {category.skills.map((skill, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  transition={{ duration: 0.2 }}
                  whileHover={{
                    boxShadow: "0 8px 30px rgba(180, 100, 255, 0.2)",
                    transition: { duration: 0.1 },
                  }}
                  className="group relative overflow-hidden rounded-lg bg-[#1a1a2e]/60 backdrop-blur-sm border border-purple-900/30 hover:border-purple-500 transition-all duration-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative z-10 p-4 flex flex-col items-center text-center">
                    <div className="text-3xl mb-2 transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                      {skill.icon}
                    </div>
                    <span className="text-gray-300 font-medium">
                      {skill.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsSection;
