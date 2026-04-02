import React, { useEffect } from "react";
import PageHeader from "../components/ui/PageHeader";
import Achievers from "../components/sections/Achievers";
import RecentRanks from "../components/sections/RecentRanks";
import StatsBand from "../components/sections/StatsBand";
import Contact from "../components/sections/Contact";
import Reveal from "../components/ui/Reveal";

export default function Results() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-cream min-h-screen">
      <PageHeader 
        title="Our Research Achievements" 
        subtitle="Celebrating years of academic excellence and the research minds that have shaped our legacy."
      />
      
      <section className="py-20 bg-white">
        <div className="max-w-site mx-auto px-5 md:px-7 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-lora font-bold text-ink mb-6">A Legacy of <em className="text-blue">Scientific Research</em>.</h2>
            <p className="text-ink/60 text-lg max-w-3xl mx-auto leading-relaxed">
              Every year, Sri Sai Institute of Agriculture Sciences is proud to produce graduates who excel in India's leading agricultural research stations and science institutions.
            </p>
          </Reveal>
        </div>
      </section>

      <RecentRanks />
      <Achievers />
      
      <section className="py-20 lg:py-28 bg-[#0b1220] text-white">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue mb-4">98%</div>
              <div className="text-white/60 font-medium">Research Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue mb-4">250+</div>
              <div className="text-white/60 font-medium">B.Sc Research Graduates</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue mb-4">80+</div>
              <div className="text-white/60 font-medium">M.Sc Specialization Seats</div>
            </div>
          </div>
        </div>
      </section>

      <StatsBand />
      <Contact />
    </div>
  );
}
