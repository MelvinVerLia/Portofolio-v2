import SkillsSection from "./SkillsSection";
import Contact from "./Contact";
import Projects from "./Projects";
import Hero from "./Hero";
import Experience from "./Experience";
import AmongusParticles from "./AmogusParticles";

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0f1b] to-[#161630] text-white font-sans">
      {/* HERO SECTION */}
      <section
        id="home"
        className="flex flex-col items-center justify-center h-screen px-4 text-center relative overflow-hidden"
      >
        {/* <AmongusParticles/> */}
        <Hero />
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="px-6 py-20 max-w-6xl mx-auto">
        <Experience />
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="px-6 py-20 max-w-6xl mx-auto">
        <Projects />
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="px-6 py-20 max-w-6xl mx-auto">
        <SkillsSection />
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="px-6 py-24 relative">
        <Contact />
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-gray-400 text-sm">
        <div className="max-w-6xl mx-auto">
          <p>© {new Date().getFullYear()} Built with pure cocaine.</p>
        </div>
      </footer>
    </main>
  );
}
