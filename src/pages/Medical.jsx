import React, { useEffect } from "react";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import SectionHeader from "../components/ui/SectionHeader";
import Contact from "../components/sections/Contact";
import StatsBand from "../components/sections/StatsBand";

export default function Medical() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-cream min-h-screen">
      <PageHeader 
        title="Medical Stream (BIPC)" 
        subtitle="Embark on your journey to becoming a doctor with our comprehensive NEET Target-40 program."
        bgImage="/hero_medical.png"
      />
      
      <section className="py-20 lg:py-28">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <SectionHeader 
                label="Medical Excellence" 
                title="Your path to <em className='text-green'>AIIMS, JIPMER, and top Government Colleges</em>."
              />
              <p className="text-ink/65 leading-8 text-lg mt-6">
                Our Biology, Physics, and Chemistry (BIPC) stream is designed with a singular focus: securing top ranks in the National Eligibility cum Entrance Test (NEET). We emphasize deep conceptual clarity in Biology and strong problem-solving skills in Physics and Chemistry.
              </p>
              
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-4 border-green">
                  <h4 className="text-green font-bold text-lg mb-2">NEET Target-40</h4>
                  <p className="text-ink/60 text-sm">Specialized batch with high-frequency doubt sessions and focused NEET preparation.</p>
                </div>
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-4 border-green">
                  <h4 className="text-green font-bold text-lg mb-2">EAPCET Track</h4>
                  <p className="text-ink/60 text-sm">Comprehensive coverage of the state board syllabus and EAPCET (EAMCET) requirements.</p>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="bg-[#041a0e] p-8 md:p-12 rounded-[2.5rem] text-white">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-green"></span> Key Medical Program Features
                </h3>
                <ul className="space-y-6">
                  {[
                    "NCERT-focused teaching for all three subjects.",
                    "Full-scale mock tests every weekend based on latest NEET patterns.",
                    "Dedicated laboratory time for practical understanding of Biology.",
                    "Experienced faculty from Kota and top Hyderabad institutes.",
                    "Separate study hours for girls and boys under supervision.",
                    "Comprehensive study material including previous year question banks."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-white/70">
                      <span className="text-green font-bold">✓</span> 
                      <span className="text-sm md:text-base">{item}</span>
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
