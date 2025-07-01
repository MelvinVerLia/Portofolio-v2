// ExperienceSection.jsx
import { motion } from "framer-motion";
import { useState } from "react";

const experiences = [
  {
    company: "Anabatic",
    position: "Software Engineering Intern",
    period: "Jan 2025 - Present",
    description:
      "Developing scalable web applications using React, TypeScript and Node.js. Collaborated with senior developers to implement new features and optimize performance.",
    technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "Express.js"],
    highlight:
      "Reduced API response time by 40% through smart caching implementation",
  },
];

const Experience = () => {
  const [activeExperience, setActiveExperience] = useState(0);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const slideIn = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-2 text-purple-400">Experience</h2>
        <div className="h-0.5 w-16 bg-purple-600 mb-10" />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Experience Selector */}
        <div className="md:col-span-1">
          <div className="space-y-3">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeIn}
                onClick={() => setActiveExperience(index)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeExperience === index
                    ? "bg-purple-900/70 border-l-4 border-purple-500"
                    : "bg-gray-900/30 hover:bg-purple-900/40"
                }`}
              >
                <h3 className="font-medium text-lg text-purple-300">
                  {exp.company}
                </h3>
                <p className="text-gray-400 text-sm">{exp.position}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience Details */}
        <motion.div
          className="md:col-span-2 bg-gray-900/40 p-6 rounded-lg border-l-2 border-purple-700"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4 }}
          variants={slideIn}
          key={activeExperience}
        >
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white">
                {experiences[activeExperience].position}
              </h3>
              <div className="flex justify-between items-center">
                <p className="text-purple-400 font-medium">
                  {experiences[activeExperience].company}
                </p>
                <p className="text-gray-400 text-sm">
                  {experiences[activeExperience].period}
                </p>
              </div>
            </div>

            <p className="text-gray-300 mb-6">
              {experiences[activeExperience].description}
            </p>

            <div className="mt-auto">
              <div className="mb-4">
                <h4 className="text-purple-400 text-sm uppercase tracking-wider mb-2">
                  Key Achievement
                </h4>
                <p className="text-white bg-purple-900/30 p-3 rounded border-l-2 border-purple-500">
                  {experiences[activeExperience].highlight}
                </p>
              </div>

              <div>
                <h4 className="text-purple-400 text-sm uppercase tracking-wider mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experiences[activeExperience].technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-800/40 rounded-full text-sm text-purple-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
