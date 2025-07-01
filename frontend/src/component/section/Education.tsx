import { motion } from "framer-motion";

const education = [
  {
    school: "University of Computer Science",
    degree: "Bachelor of Science in Computer Science",
    period: "2021 - 2025",
    description:
      "Specializing in Software Engineering with a minor in Data Science. Relevant coursework included Advanced Algorithms, Database Systems, Web Development, and Machine Learning Fundamentals.",
    achievements: [
      "Dean's List: All semesters",
      "Capstone Project: Developed an AI-powered manga recommendation system",
      "Lead organizer for university hackathon event",
    ],
    gpa: "3.85/4.0",
  },
  {
    school: "Tech Certification Academy",
    degree: "Full Stack Web Development Certificate",
    period: "Summer 2023",
    description:
      "Intensive 12-week bootcamp focused on modern web development technologies and practices. Developed multiple full-stack applications individually and in team environments.",
    achievements: [
      "Graduated with distinction",
      "Best Project Award for team project",
    ],
  },
];

const Education = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="mt-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-2 text-purple-400">Education</h2>
        <div className="h-0.5 w-16 bg-purple-600 mb-10" />
      </motion.div>

      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: index * 0.2 }}
            variants={fadeIn}
            className="bg-gray-900/40 p-6 rounded-lg border-l-2 border-purple-700"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                <p className="text-purple-400">{edu.school}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="px-4 py-1 bg-purple-900/60 rounded-full text-sm text-white">
                  {edu.period}
                </span>
                {edu.gpa && (
                  <p className="text-purple-300 mt-2 text-right">
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            </div>

            <p className="text-gray-300 mb-4">{edu.description}</p>

            {edu.achievements && edu.achievements.length > 0 && (
              <div>
                <h4 className="text-purple-400 text-sm uppercase tracking-wider mb-2">
                  Achievements
                </h4>
                <ul className="space-y-2">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span className="text-gray-200">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;
