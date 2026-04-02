import React, { useEffect } from "react";
import axios from "axios";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import SectionHeader from "../components/ui/SectionHeader";
import Contact from "../components/sections/Contact";
import StatsBand from "../components/sections/StatsBand";

export default function Engineering() {
  const [dynamicCourses, setDynamicCourses] = React.useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses");
        setDynamicCourses(res.data.filter(c => c.stream?.toLowerCase() === 'engineering'));
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();

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
        title="Engineering Stream (MPC)" 
        subtitle="Transforming aspirations into achievements with India's most rigorous and result-oriented engineering prep."
        bgImage="/hero_engineering.png"
      />
      
      {/* Overview Section */}
      <section id="engineering-overview" className="py-20 scroll-mt-[100px]">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <SectionHeader 
                label="Engineering Excellence" 
                title="Your Gateway to <em className='text-blue'>IITs & NITs</em>."
              />
              <p className="text-ink/65 leading-8 text-lg mt-6">
                The Engineering Stream (MPC) at Aakash Academy is more than just a coaching program; it's a launchpad for future innovators. We provide a competitive yet nurturing environment where students master Mathematics, Physics, and Chemistry through a structured curriculum that balances state board requirements with national-level entrance exam rigor.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Systematic Syllabus Mapping (Board + JEE)",
                  "Concept-First Teaching Methodology",
                  "Advanced Problem-Solving Workshops",
                  "24/7 Academic Support & Doubt Resolution"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-ink/80">
                    <div className="w-6 h-6 rounded-full bg-blue/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue"></div>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-blue/5 rounded-[3rem] -rotate-2"></div>
                <img 
                  src="/hero_engineering.png" 
                  alt="Engineering Stream" 
                  className="relative rounded-[2.5rem] shadow-2xl border-8 border-white object-cover aspect-[4/3]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
 
      {/* Program Tracks */}
      <section id="program-tracks" className="py-20 bg-white scroll-mt-[100px]">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Specialized <span className="text-blue italic">Tracks</span></h2>
              <p className="text-ink/60 max-w-2xl mx-auto">Choose the path that aligns with your career goals. Each tract is optimized for specific exam patterns.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* JEE Mains - Super 40 */}
            <Reveal delay={0.1}>
              <div id="jee-mains-super-40" className="h-full bg-cream p-8 rounded-[2rem] border border-blue/10 flex flex-col group hover:bg-blue hover:border-blue transition-all duration-500 scroll-mt-[100px]">
                <div className="bg-blue/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white">JEE Mains – Super 40</h3>
                <p className="text-ink/65 mb-8 group-hover:text-white/80 leading-relaxed">
                  An elite batch limited to 40 students. This track focuses on extreme speed, accuracy, and mastery over the NTA pattern. High individual attention ensures every student reaches their peak potential.
                </p>
                <div className="mt-auto space-y-3">
                  {["Limited Batch Size (40 Max)", "Daily Test Series", "Personalized Performance Analysis"].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 group-hover:text-white/90 text-sm">
                      <span className="text-blue group-hover:text-white">✓</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* JEE Advanced Track */}
            <Reveal delay={0.2}>
              <div id="jee-advanced-track" className="h-full bg-cream p-8 rounded-[2rem] border border-blue/10 flex flex-col group hover:bg-blue hover:border-blue transition-all duration-500 shadow-xl shadow-blue/5 scroll-mt-[100px]">
                <div className="bg-blue/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20">
                  <span className="text-3xl">🧠</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white">JEE Advanced Track</h3>
                <p className="text-ink/65 mb-8 group-hover:text-white/80 leading-relaxed">
                  Designed for the 'thinkers'. This track dives deep into multi-concept problems and advanced physics/math proof-based learning required for the IIT entrance exam.
                </p>
                <div className="mt-auto space-y-3">
                  {["Deep Concept Building", "Multi-Concept Problem Sets", "IIT Alumnus Mentors"].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 group-hover:text-white/90 text-sm">
                      <span className="text-blue group-hover:text-white">✓</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* EAPCET Preparation */}
            <Reveal delay={0.3}>
              <div id="eapcet-preparation" className="h-full bg-cream p-8 rounded-[2rem] border border-blue/10 flex flex-col group hover:bg-blue hover:border-blue transition-all duration-500 scroll-mt-[100px]">
                <div className="bg-blue/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white">EAPCET Preparation</h3>
                <p className="text-ink/65 mb-8 group-hover:text-white/80 leading-relaxed">
                  Focused training for the state-level entrance exam. We emphasize the AP/TS intermediate syllabus and the specific shortcut techniques needed for EAPCET success.
                </p>
                <div className="mt-auto space-y-3">
                  {["State Board Integrated", "30,000+ Practice MCQs", "Speed-Accuracy Blitz Sessions"].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 group-hover:text-white/90 text-sm">
                      <span className="text-blue group-hover:text-white">✓</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* DYNAMIC COURSES */}
            {dynamicCourses.map((c, i) => (
              <Reveal key={c._id} delay={0.4 + i * 0.1}>
                <div className="h-full bg-cream p-8 rounded-[3rem] border border-blue/10 flex flex-col group hover:bg-blue hover:border-blue transition-all duration-500 shadow-xl shadow-blue/5">
                  <div className="bg-blue/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20">
                    <span className="text-3xl">📘</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white">{c.title}</h3>
                  {c.image && (
                    <img 
                      src={c.image.startsWith('http') ? c.image : `${c.image}`} 
                      className="w-full h-32 object-cover rounded-2xl mb-4" 
                      alt="" 
                    />
                  )}

                  <p className="text-ink/65 mb-8 group-hover:text-white/80 leading-relaxed">
                    {c.description}
                  </p>
                  <div className="mt-auto space-y-3">
                    {c.details.map((d, j) => (
                      <div key={j} className="flex items-center gap-2 group-hover:text-white/90 text-sm">
                        <span className="text-blue group-hover:text-white">✓</span> {d}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Detail */}
      <section className="py-20 lg:py-28">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="bg-ink p-8 md:p-20 rounded-[3rem] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-8">Integrated Junior & Senior <span className="text-blue">Intermediate</span> Curriculum</h3>
                <p className="text-white/60 text-lg mb-10">We bridge the gap between Board examinations and Competitive entrance tests through a synchronized teaching schedule.</p>
                <div className="space-y-6">
                  {[
                    { title: "Mathematics", desc: "From Algebra to Calculus, focusing on analytical thinking." },
                    { title: "Physics", desc: "Mechanics, Electromagnetism, and Modern Physics with practical insights." },
                    { title: "Chemistry", desc: "Visualizing Physical, Organic, and Inorganic Chemistry concepts." }
                  ].map((subject, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-blue font-bold">
                        0{i+1}
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
                    <div className="text-3xl font-bold text-blue mb-1">Daily</div>
                    <div className="text-white/60 text-xs">Exams</div>
                  </div>
                  <div className="bg-blue p-8 rounded-3xl">
                    <div className="text-3xl font-bold text-white mb-1">Weekend</div>
                    <div className="text-white/80 text-xs">Mains/Adv Patterns</div>
                  </div>
                </div>
                <div className="pt-8 space-y-4">
                  <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                    <div className="text-3xl font-bold text-blue mb-1">5000+</div>
                    <div className="text-white/60 text-xs">Archive Questions</div>
                  </div>
                  <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                    <div className="text-3xl font-bold text-white mb-1">24/7</div>
                    <div className="text-white/60 text-xs">Study Hall Support</div>
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
                <div className="absolute -inset-2 bg-blue/10 rounded-[2.5rem] blur-xl group-hover:bg-blue/20 transition-all duration-700"></div>
                <img 
                  src="/hero_engineering.png" 
                  alt="Hostel Life" 
                  className="relative rounded-[2rem] shadow-2xl border-4 border-white grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 aspect-[16/10] object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-4xl font-bold mb-6">Safe & Structured <span className="text-blue italic">Residential</span> Facilities</h2>
              <p className="text-ink/65 text-lg leading-relaxed mb-10">
                At SRI Aakash, we understand that a proper environment is crucial for academic success. We provide separate, safe, and purpose-built campuses for boys and girls, featuring on-site hostels and supervised evening study hours.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-blue flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-blue"></span> Separate Campuses
                  </h4>
                  <p className="text-ink/50 text-sm">Dedicated residential and academic campuses for Boys and Girls to ensure total focus.</p>
                </div>
                <div>
                  <h4 className="font-bold text-blue flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-blue"></span> Supervised Studies
                  </h4>
                  <p className="text-ink/50 text-sm">Evening preparation hours directly supervised by senior faculty for doubt resolution.</p>
                </div>
                <div>
                  <h4 className="font-bold text-blue flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-blue"></span> Balanced Diet
                  </h4>
                  <p className="text-ink/50 text-sm">Hygienic and nutritious meals prepared on-site to keep students energetic and healthy.</p>
                </div>
                <div>
                  <h4 className="font-bold text-blue flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-blue"></span> Strict Discipline
                  </h4>
                  <p className="text-ink/50 text-sm">A distraction-free environment with no mobile phones allowed during study hours.</p>
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
