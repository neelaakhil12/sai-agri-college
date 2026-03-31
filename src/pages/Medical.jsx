import React, { useEffect } from "react";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import SectionHeader from "../components/ui/SectionHeader";
import Contact from "../components/sections/Contact";
import StatsBand from "../components/sections/StatsBand";

export default function Medical() {
  useEffect(() => {
    function scrollToHash() {
      if (window.location.hash) {
        const id = window.location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
          return true;
        }
      }
      return false;
    }

    if (!scrollToHash()) {
      window.scrollTo(0, 0);
    }

    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <div className="bg-cream min-h-screen font-outfit">
      <PageHeader 
        title="Medical Stream (BiPC)" 
        subtitle="Nurturing the next generation of healthcare professionals with precision, care, and academic excellence."
        bgImage="/hero_medical.png"
      />
      
       {/* Overview Section */}
       <section id="medical-overview" className="py-20 scroll-mt-[100px]">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <SectionHeader 
                label="Medical Excellence" 
                title="Your Journey to Becoming a <em className='text-green'>Doctor</em> starts here."
              />
              <p className="text-ink/65 leading-8 text-lg mt-6">
                The Medical Stream (BiPC) at Aakash Academy is meticulously designed for students who aspire to crack NEET and other medical entrance exams. We emphasize a deep understanding of biological concepts, complemented by strong foundations in Physics and Chemistry.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Intensive NCERT-Based Pedagogy",
                  "Diagram-Centric Biology Workshops",
                  "Physics Problem Solving for Medical Aspirants",
                  "Regular Health & Stress Management Sessions"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-ink/80">
                    <div className="w-6 h-6 rounded-full bg-green/10 flex items-center justify-center">
                       <span className="text-green text-xs">✔</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-green/5 rounded-[3rem] rotate-2"></div>
                <img 
                  src="/hero_medical.png" 
                  alt="Medical Stream" 
                  className="relative rounded-[2.5rem] shadow-2xl border-8 border-white object-cover aspect-[4/3]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Program Tracks */}
      <section id="medical-program-tracks" className="py-20 bg-white scroll-mt-[100px]">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Medical <span className="text-green italic">Programmes</span></h2>
              <p className="text-ink/60 max-w-2xl mx-auto">Specialized coaching tracks designed to maximize your rank in competitive medical entrances.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* NEET Target Batch - 40 */}
            <Reveal delay={0.1}>
              <div id="neet-target-batch-40" className="h-full bg-[#f0f9f4] p-8 rounded-[2rem] border border-green/10 flex flex-col group hover:bg-green hover:border-green transition-all duration-500 scroll-mt-[100px]">
                <div className="bg-green/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20">
                  <span className="text-3xl">🩺</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white">NEET Target Batch – 40</h3>
                <p className="text-ink/65 mb-8 group-hover:text-white/80 leading-relaxed">
                  Our flagship batch for high-achievers. Limited to 40 students, this program offers personalized mentoring and an accelerated curriculum aimed at AIIMS & top Govt colleges.
                </p>
                <div className="mt-auto space-y-3">
                  {["Daily Doubt-Clearing", "One-on-One Mentorship", "Custom Rank-Booster Plans"].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 group-hover:text-white/90 text-sm">
                      <span className="text-green group-hover:text-white">●</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Full Medical Programme */}
            <Reveal delay={0.2}>
              <div id="full-medical-programme" className="h-full bg-[#f0f9f4] p-8 rounded-[2rem] border border-green/10 flex flex-col group hover:bg-green hover:border-green transition-all duration-500 shadow-xl shadow-green/5 scroll-mt-[100px]">
                <div className="bg-green/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white">Full Medical Programme</h3>
                <p className="text-ink/65 mb-8 group-hover:text-white/80 leading-relaxed">
                  A comprehensive 2-year integrated course covering the entire BiPC syllabus from basics to NEET/EAPCET level with extensive regular testing.
                </p>
                <div className="mt-auto space-y-3">
                  {["Thorough NCERT Coverage", "Weekly Cumulative Exams", "Extensive Study Materials"].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 group-hover:text-white/90 text-sm">
                      <span className="text-green group-hover:text-white">●</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* EAPCET Preparation */}
            <Reveal delay={0.3}>
              <div id="medical-eapcet-preparation" className="h-full bg-[#f0f9f4] p-8 rounded-[2rem] border border-green/10 flex flex-col group hover:bg-green hover:border-green transition-all duration-500 scroll-mt-[100px]">
                <div className="bg-green/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20">
                  <span className="text-3xl">🧪</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white">EAPCET Preparation</h3>
                <p className="text-ink/65 mb-8 group-hover:text-white/80 leading-relaxed">
                  Tailored for students focusing on state-level medical and agriculture entrance exams. High focus on speed and state board exam patterns.
                </p>
                <div className="mt-auto space-y-3">
                  {["State Syllabus Optimized", "Shortcut Techniques", "Previous Year Analytics"].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 group-hover:text-white/90 text-sm">
                      <span className="text-green group-hover:text-white">●</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Curriculum Detail */}
      <section className="py-20 lg:py-28">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="bg-[#041a0e] p-8 md:p-20 rounded-[3rem] text-white overflow-hidden relative border border-green/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-8">Integrated Junior & Senior <span className="text-green">Intermediate</span> Curriculum</h3>
                <p className="text-white/60 text-lg mb-10">Our BiPC curriculum is perfectly synced with NCERT, ensuring students excel in both Boards and Competitive exams.</p>
                <div className="space-y-6">
                  {[
                    { title: "Botany & Zoology", desc: "Interactive sessions with 3D models and vivid diagrams." },
                    { title: "Organic Chemistry", desc: "Mechanism-based learning through visualization." },
                    { title: "Applied Physics", desc: "Focusing on numericals that frequently appear in NEET." }
                  ].map((subject, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-green font-bold text-xl">
                        ★
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-1">{subject.title}</h4>
                        <p className="text-white/50 text-sm">{subject.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                    <div className="text-3xl font-bold text-green mb-1">NCERT</div>
                    <div className="text-white/60 text-xs">Based Pedagogy</div>
                  </div>
                  <div className="bg-green p-8 rounded-3xl">
                    <div className="text-3xl font-bold text-white mb-1">Mock</div>
                    <div className="text-white/80 text-xs">Exams Weekly</div>
                  </div>
                </div>
                <div className="pt-8 space-y-4">
                  <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                    <div className="text-3xl font-bold text-green mb-1">Expert</div>
                    <div className="text-white/60 text-xs">Faculty Support</div>
                  </div>
                  <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                    <div className="text-3xl font-bold text-white mb-1">Digital</div>
                    <div className="text-white/60 text-xs">Assessment Portal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Residential Section */}
      <section className="py-20 bg-white">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <Reveal>
              <div className="relative group">
                <div className="absolute -inset-2 bg-green/10 rounded-[2.5rem] blur-xl group-hover:bg-green/20 transition-all duration-700"></div>
                <img 
                  src="/Girls.JPG.jpeg" 
                  alt="Medical Girls Campus" 
                  className="relative rounded-[2rem] shadow-2xl border-4 border-white grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 aspect-[16/10] object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-4xl font-bold mb-6">Separate <span className="text-green italic">Medical</span> Campus & Hostels</h2>
              <p className="text-ink/65 text-lg leading-relaxed mb-10">
                Success in NEET requires immense focus. We provide separate, purpose-built campuses for boys and girls to ensure a safe, distraction-free environment where students can dedicate their time fully to their medical aspirations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-green flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-green"></span> Purpose-Built Safety
                  </h4>
                  <p className="text-ink/50 text-sm">24/7 security and warden supervision at both our girls and boys residential campuses.</p>
                </div>
                <div>
                  <h4 className="font-bold text-green flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-green"></span> Supervised Study Hours
                  </h4>
                  <p className="text-ink/50 text-sm">Mandatory evening study sessions in the campus under the guidance of subject experts.</p>
                </div>
                <div>
                  <h4 className="font-bold text-green flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-green"></span> Nutritious Dining
                  </h4>
                  <p className="text-ink/50 text-sm">Balanced, healthy meals designed to keep medical students mentally sharp and physically fit.</p>
                </div>
                <div>
                  <h4 className="font-bold text-green flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-green"></span> Clean Environment
                  </h4>
                  <p className="text-ink/50 text-sm">Hygienic living conditions with regular sanitation to ensure students stay healthy year-round.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      
      <StatsBand />
      <Contact />
    </div>

  );
}
