import SkillsSection from "../FAB/SkillsSection";
import Contact from "../section/Contact";
import Projects from "../section/Projects";
import Experience from "../section/Experience";
import AmongusParticles from "../particle/AmogusParticles";
import BentoHero from "./BentoHero";

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0f1b] to-[#161630] text-white font-sans">
      {/* HERO SECTION */}
      <section
        id="home"
        className="flex flex-col items-center justify-center gap-0 h-screen px-4 text-center relative"
      >
        <div className="absolute inset-0">
          <AmongusParticles />
        </div>

        {/* Content on top */}
        <div className="relative z-10">
          <BentoHero />
        </div>
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
          <p>© {new Date().getFullYear()} Running on hopes and dreams</p>
        </div>
      </footer>
    </main>
  );
}
