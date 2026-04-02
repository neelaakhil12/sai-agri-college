import React, { useEffect } from "react";
import PageHeader from "../components/ui/PageHeader";
import Faculty from "../components/sections/Faculty";
import Contact from "../components/sections/Contact";
import Reveal from "../components/ui/Reveal";

export default function FacultyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-cream min-h-screen">
      <PageHeader 
        title="Our Research Faculty" 
        subtitle="Learn from the Masters. Our educators are veterans in agricultural sciences and core scientific research."
      />
      
      <section className="py-20 bg-white">
        <div className="max-w-site mx-auto px-5 md:px-7 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-lora font-bold text-ink mb-6">Experience <em className="text-blue">Beyond Textbooks</em>.</h2>
            <p className="text-ink/65 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              At Sri Sai Institute of Agriculture Sciences, we believe that great educators are the backbone of quality agriculture education. Our faculty carries deep expertise in modern Agriculture, Biology, Chemistry, and Zoology.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="bg-[#fafaf7] pb-24">
        <Faculty />
      </div>

      <section className="py-20 lg:py-28 bg-[#0b1220] text-white">
        <div className="max-w-site mx-auto px-5 md:px-7 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h3 className="text-3xl md:text-4xl font-lora font-bold mb-6">A Message from the <em className="text-blue">Principal</em>.</h3>
              <p className="text-white/60 leading-relaxed text-lg mb-8">
                "A good teacher is a selfless role model and a visionary for student success. My goal at Sri Sai Institute has always been to ensure that every student who walks through these doors reaches their professional agricultural research destination."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue flex items-center justify-center font-bold text-lg">SS</div>
                <div>
                   <div className="font-bold text-xl">Sri Sai</div>
                   <div className="text-blue/80 text-sm italic">Principal & Correspondent</div>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="bg-white/5 border border-white/10 p-10 rounded-3xl">
                <h4 className="text-blue text-xl font-bold mb-6 flex items-center gap-2">👨‍🏫 Why Learn with Us?</h4>
                <ul className="space-y-6">
                {[
                  "Hands-on agricultural field training and lab experiments.",
                  "Research-based projects for every science student.",
                  "Personalized mentoring and professional guidance.",
                  "Modern teaching aids for agricultural science.",
                  "Agri-industry connections and career placement support."
                ].map((point, pi) => (
                  <li key={pi} className="flex gap-4 items-start text-white/70">
                    <span className="text-blue mt-1">●</span> {point}
                  </li>
                ))}
                </ul>
              </div>
            </Reveal>
        </div>
      </section>

      <Contact />
    </div>
  );
}
