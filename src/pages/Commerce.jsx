import React, { useEffect } from "react";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import SectionHeader from "../components/ui/SectionHeader";
import Contact from "../components/sections/Contact";
import StatsBand from "../components/sections/StatsBand";

export default function Commerce() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-cream min-h-screen">
      <PageHeader 
        title="Commerce Stream (MEC)" 
        subtitle="Start your professional journey towards becoming a Chartered Accountant (CA) or CMA with us."
        bgImage="/hero_commerce.png"
      />
      
      <section className="py-20 lg:py-28">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <SectionHeader 
                label="Commerce Track" 
                title="Your professional career as a <em className='text-gold'>CA or CMA</em> begins here."
              />
              <p className="text-ink/65 leading-8 text-lg mt-6">
                Our MEC stream (Mathematics, Economics, and Commerce) offers an integrated approach combining intermediate education with professional coaching for CA Foundation (CPT) and CMA exams.
              </p>
              
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gold/10">
                  <h4 className="text-gold font-bold text-lg mb-2">CPT (CA Foundation)</h4>
                  <p className="text-ink/60 text-sm">Comprehensive coaching for the CA Foundation exam integrated with board classes.</p>
                </div>
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gold/10">
                  <h4 className="text-gold font-bold text-lg mb-2">CMA Intensive</h4>
                  <p className="text-ink/60 text-sm">Specific batches for Cost & Management Accountancy with professional faculty.</p>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="bg-[#1a0e04] p-8 md:p-12 rounded-[2.5rem] text-white">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gold">
                  🎓 MEC & Professional Highlights
                </h3>
                <ul className="space-y-6">
                  {[
                    "Experienced CAs and industry professionals as guest lecturers.",
                    "Focus on conceptual understanding of Accountancy & Economics.",
                    "Mock tests mirroring the pattern of professional foundation exams.",
                    "Guest lectures from practicing Chartered Accountants.",
                    "Integrated Mathematics support specifically for CA foundation.",
                    "Carrier guidance sessions for professional commerce paths."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-white/70">
                      <span className="text-gold font-bold">●</span> 
                      <span className="text-sm md:text-base font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
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
