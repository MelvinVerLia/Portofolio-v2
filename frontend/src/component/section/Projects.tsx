import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const projectsData = [
  {
    id: 1,
    title: "Cyka Blyat App",
    image: "dog.jpg",
    description:
      "A responsive manga reading application with customizable reading experience, bookmarking and chapter tracking.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    featuredPoints: [
      "Implemented lazy loading for optimized image delivery",
      "Built custom reading modes (vertical scroll, horizontal page flip)",
      "Integrated user accounts with reading history synchronization",
    ],
    demoLink: "https://example.com/demo",
    codeLink: "https://github.com/yourusername/project",
  },
  {
    id: 2,
    title: "DevConnect Platform",
    image: "dog.jpg",
    description:
      "Social network for developers to collaborate, share projects and find team members for side projects.",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS", "Algolia"],
    featuredPoints: [
      "Implemented real-time messaging using Firebase",
      "Built advanced search functionality with Algolia",
      "Created team-matching algorithm based on skills compatibility",
    ],
    demoLink: "https://example.com/demo",
    codeLink: "https://github.com/yourusername/project",
  },
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    if (activeProject !== null) {
      console.log(typeof activeProject);
    }
  }, [activeProject]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-2 text-purple-400">Projects</h2>
        <div className="h-0.5 w-16 bg-purple-600 mb-10" />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
      >
        {projectsData.map((project) => (
          <motion.div
            key={project.id}
            className="bg-gray-900/40 rounded-lg overflow-hidden border border-gray-800 hover:border-purple-700 transition-all duration-300 flex flex-col h-fit hover:cursor-pointer"
            variants={fadeIn}
            onClick={() =>
              setActiveProject(activeProject === project.id ? null : project.id)
            }
          >
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover object-center transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-purple-900/30 rounded-md text-xs text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-purple-900/30 rounded-md text-xs text-purple-300">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              <AnimatePresence>
                {activeProject === project.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 pt-3 border-t border-gray-700"
                  >
                    <h4 className="text-purple-400 text-sm uppercase font-medium mb-2">
                      Key Features
                    </h4>
                    <ul className="space-y-2 mb-4">
                      {project.featuredPoints.map((point, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <span className="text-purple-500 mr-2">•</span>
                          <span className="text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex gap-3 mt-4">
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white text-sm rounded flex-1 text-center transition-colors duration-300"
                >
                  Live Demo
                </a>
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded flex-1 text-center transition-colors duration-300"
                >
                  Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
