import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import SectionHeader from "../components/ui/SectionHeader";
import Contact from "../components/sections/Contact";
import StatsBand from "../components/sections/StatsBand";

export default function Commerce() {
  const [dynamicCourses, setDynamicCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setDynamicCourses(res.data.filter(c => c.stream?.toLowerCase() === 'commerce'));
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
        title="Commerce Stream (MEC)" 
        subtitle="Empowering future financial leaders with integrated professional coaching for CA and CMA."
        bgImage="/hero_commerce.png"
      />
      
      {/* Overview Section */}
      <section className="py-20">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <SectionHeader 
                label="Commerce Track" 
                title="Mastering the world of <em className='text-gold'>Finance & Business</em>."
              />
              <p className="text-ink/65 leading-8 text-lg mt-6">
                Our MEC stream (Mathematics, Economics, and Commerce) is more than just a course; it's a foundation for elite professional careers. By integrating Indian Intermediate education with professional entrance coaching, we save students' time and give them a competitive edge in the corporate world.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Case Study Based Learning",
                  "Advanced Accountancy Workshops",
                  "Economic Policy Analysis",
                  "Professional Communication Skills"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-ink/70 bg-white p-4 rounded-xl border border-gold/5 shadow-sm">
                    <span className="text-gold">◈</span>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gold/5 rounded-[3rem] -rotate-1"></div>
                <img 
                  src="/hero_commerce.png" 
                  alt="Commerce Stream" 
                  className="relative rounded-[2.5rem] shadow-2xl border-8 border-white object-cover aspect-[4/3]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Professional Tracks */}
      <section className="py-20 bg-white">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-ink">Professional <span className="text-gold italic">Aspirations</span></h2>
              <p className="text-ink/60 max-w-2xl mx-auto">We provide integrated coaching for India's most prestigious financial professions.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CA Foundation / CPT */}
            <Reveal delay={0.1}>
              <div className="h-full bg-[#fffcf5] p-10 rounded-[2.5rem] border border-gold/10 flex flex-col group hover:bg-gold hover:border-gold transition-all duration-500">
                <div className="bg-gold/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/20">
                  <span className="text-4xl">💎</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 group-hover:text-white">CA Foundation (CPT)</h3>
                <p className="text-ink/65 mb-8 group-hover:text-white/80 text-lg leading-relaxed">
                  Start your journey as a Chartered Accountant right from Intermediate. Our integrated curriculum covers Accounting, Law, Economics, and Quantitative Aptitude with professional-level rigor.
                </p>
                <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Expert CAs as Faculty", "ICAI Pattern Tests", "Special Law Workshops", "Doubt Clearing Hub"].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 group-hover:text-white/90 text-sm">
                      <span className="text-gold group-hover:text-white">●</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* CMA Integrated */}
            <Reveal delay={0.2}>
              <div className="h-full bg-[#fffcf5] p-10 rounded-[2.5rem] border border-gold/10 flex flex-col group hover:bg-gold hover:border-gold transition-all duration-500 shadow-xl shadow-gold/5">
                <div className="bg-gold/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/20">
                  <span className="text-4xl">📈</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 group-hover:text-white">CMA Intensive Track</h3>
                <p className="text-ink/65 mb-8 group-hover:text-white/80 text-lg leading-relaxed">
                  Focusing on Cost & Management Accountancy, this track is designed for students aiming for operational and strategic management roles in top global corporations.
                </p>
                <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Costing Specialization", "Strategic Management", "Industry Expert Talks", "Regular Mock Drills"].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 group-hover:text-white/90 text-sm">
                      <span className="text-gold group-hover:text-white">●</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* DYNAMIC COURSES */}
            {dynamicCourses.map((c, i) => (
               <Reveal key={c._id} delay={0.3 + i * 0.1}>
                 <div className="h-full bg-[#fffcf5] p-10 rounded-[2.5rem] border border-gold/10 flex flex-col group hover:bg-gold hover:border-gold transition-all duration-500 shadow-xl shadow-gold/5">
                   <div className="bg-gold/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/20">
                     <span className="text-4xl">💼</span>
                   </div>
                   <h3 className="text-3xl font-bold mb-6 group-hover:text-white">{c.title}</h3>
                   {c.image && (
                    <img 
                      src={c.image.startsWith('http') ? c.image : `http://localhost:5000${c.image}`} 
                      className="w-full h-40 object-cover rounded-[2rem] mb-6" 
                      alt="" 
                    />
                   )}

                   <p className="text-ink/65 mb-8 group-hover:text-white/80 text-lg leading-relaxed">
                     {c.description}
                   </p>
                   <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {c.details.map((d, j) => (
                       <div key={j} className="flex items-center gap-2 group-hover:text-white/90 text-sm">
                         <span className="text-gold group-hover:text-white">●</span> {d}
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
          <div className="bg-[#1a0e04] p-8 md:p-20 rounded-[3rem] text-white overflow-hidden relative border border-gold/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Integrated Junior & Senior <span className="text-gold italic">Intermediate</span> Curriculum</h3>
                <p className="text-white/60 text-xl mb-12">Commerce education requires real-world application. We bridge the gap between intermediate boards and professional CA/CMA exams.</p>
                
                <div className="space-y-6">
                  {[
                    { title: "Accountancy & Law", desc: "Mastering the fundamentals of bookkeeping and business regulations." },
                    { title: "Economic Policy", desc: "Understanding market dynamics and global economic shifts." },
                    { title: "Quant & Logic", desc: "Developing the numerical speed required for professional foundation tests." }
                  ].map((subject, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-gold font-bold">
                        ◈
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-1">{subject.title}</h4>
                        <p className="text-white/50 text-sm">{subject.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative grid grid-cols-2 gap-4">
                 <div className="space-y-4">
                  <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                    <div className="text-3xl font-bold text-gold mb-1">100%</div>
                    <div className="text-white/60 text-xs">Integrated Study</div>
                  </div>
                  <div className="bg-gold p-8 rounded-3xl">
                    <div className="text-3xl font-bold text-ink mb-1">Guest</div>
                    <div className="text-ink/70 text-xs">CA Lectures</div>
                  </div>
                </div>
                <div className="pt-8 space-y-4">
                  <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                    <div className="text-3xl font-bold text-gold mb-1">Weekly</div>
                    <div className="text-white/60 text-xs">Professional Drills</div>
                  </div>
                  <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                    <div className="text-3xl font-bold text-white mb-1">Career</div>
                    <div className="text-white/60 text-xs">Path Mapping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBand />
      <Contact />
    </div>

  );
}
