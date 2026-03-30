import React, { useEffect } from "react";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import SectionHeader from "../components/ui/SectionHeader";
import Contact from "../components/sections/Contact";
import StatsBand from "../components/sections/StatsBand";

export default function Engineering() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-cream min-h-screen">
      <PageHeader 
        title="Engineering Stream (MPC)" 
        subtitle="Focused preparing for IITs, NITs, and top engineering institutions with our elite Super-40 batch."
        bgImage="/hero_engineering.png"
      />
      
      <section className="py-20">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <SectionHeader 
                label="Course Overview" 
                title="Building a Solid Foundation for <em className='text-blue'>IIT-JEE success</em>."
              />
              <p className="text-ink/65 leading-8 text-lg mt-6">
                Our Engineering Stream (MPC) is meticulously designed for students who aspire to reach the pinnacle of technical education in India. With a focus on Mathematics, Physics, and Chemistry, we bridge the gap between intermediate boards and competitive entrance exams like JEE Mains and Advanced.
              </p>
              
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue/10">
                  <h4 className="text-blue font-bold text-lg mb-2">Super-40 Batch</h4>
                  <p className="text-ink/60 text-sm">Exclusive batches limited to 40 students for personalized attention and high-impact coaching.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue/10">
                  <h4 className="text-blue font-bold text-lg mb-2">Advanced Track</h4>
                  <p className="text-ink/60 text-sm">In-depth conceptual learning specifically targeted at cracking the JEE Advanced exam.</p>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="bg-ink p-8 md:p-12 rounded-[2.5rem] text-white">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-blue"></span> Curriculum & Features
                </h3>
                <ul className="space-y-6">
                  {[
                    "Daily 6-hour intensive teaching followed by study hours.",
                    "Weekly cumulative tests based on JEE patterns.",
                    "Special doubt-clearing sessions with HODs.",
                    "Integrated Board + Competitive exam preparation.",
                    "Digital learning support with online testing portal.",
                    "Personalized performance tracking and parent reports."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-white/70">
                      <span className="text-blue font-bold">0{i+1}.</span> 
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
