import React, { useEffect } from "react";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import SectionHeader from "../components/ui/SectionHeader";
import Contact from "../components/sections/Contact";
import StatsBand from "../components/sections/StatsBand";

export default function Hostel() {
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
        title="Separate Hostel for Boys & Girls"
        subtitle="Safe, structured, and focused residential campuses designed for academic excellence."
        bgImage="/hero_hostel.png"
      />

      {/* Overview Section */}
      <section className="py-20">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <SectionHeader
                label="Hostel Facilities"
                title="A home away from <em className='text-blue'>home</em>."
              />
              <p className="text-ink/65 leading-8 text-lg mt-6">
                At Sri Sai Institute of Agriculture Sciences, we understand that a proper living environment is crucial for academic success. Our separate, safe, and purpose-built residential campuses for Boys and Girls provide the perfect foundation for students to focus entirely on their studies without daily commute stress.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Separate campuses for Boys and Girls",
                  "24/7 Security and CCTV Surveillance",
                  "Supervised evening study hours",
                  "Hygienic and nutritious on-site meals"
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
                  src="/hostel.png"
                  alt="Hostel Campus"
                  className="relative rounded-[2.5rem] shadow-2xl border-8 border-white object-cover aspect-[4/3]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Hostel <span className="text-blue italic">Facilities</span></h2>
              <p className="text-ink/60 max-w-2xl mx-auto">Separate safe campuses for Boys and Girls pursuing academic excellence.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🏠",
                title: "Safe Residential Wings",
                desc: "Quiet, well-ventilated rooms designed for long hours of focused study and preparation."
              },
              {
                icon: "👨‍🏫",
                title: "24/7 Faculty Access",
                desc: "Faculty available on-campus during evening hours for immediate doubt clearing."
              },
              {
                icon: "🍽️",
                title: "Healthy Campus Food",
                desc: "Home-style meals that keep students healthy and focused on their academic goals."
              },
              {
                icon: "🎯",
                title: "Career Mentorship",
                desc: "Regular interaction with senior batch-mates and alumni for professional networking."
              }
            ].map((facility, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="h-full bg-cream p-8 rounded-[2rem] border border-blue/10 flex flex-col group hover:bg-blue hover:border-blue transition-all duration-500">
                  <div className="bg-blue/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20">
                    <span className="text-3xl">{facility.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-white">{facility.title}</h3>
                  <p className="text-ink/65 group-hover:text-white/80 leading-relaxed">
                    {facility.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hostel Highlight Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="bg-ink p-8 md:p-20 rounded-[3rem] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-8">Designed for <span className="text-blue">Professional</span> Focus</h3>
                <p className="text-white/60 text-lg mb-10">
                  Competitive exams require a disciplined routine. Our residential campuses provide the perfect environment for students to stay focused on their long-term goals without daily commute stress.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "Disciplined Environment", desc: "Structured daily routines that balance study, rest, and recreation for optimal performance." },
                    { title: "Distraction-Free Zone", desc: "No mobile phones allowed during study hours. Pure academic focus guaranteed." },
                    { title: "Peer Learning", desc: "Collaborative study groups and healthy competition among hostel residents." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-blue font-bold">
                        0{i+1}
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                        <p className="text-white/50 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                    <div className="text-3xl font-bold text-blue mb-1">24/7</div>
                    <div className="text-white/60 text-xs">Security</div>
                  </div>
                  <div className="bg-blue p-8 rounded-3xl">
                    <div className="text-3xl font-bold text-white mb-1">Separate</div>
                    <div className="text-white/80 text-xs">Boys & Girls</div>
                  </div>
                </div>
                <div className="pt-8 space-y-4">
                  <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                    <div className="text-3xl font-bold text-blue mb-1">On-site</div>
                    <div className="text-white/60 text-xs">Meals & Laundry</div>
                  </div>
                  <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                    <div className="text-3xl font-bold text-white mb-1">Supervised</div>
                    <div className="text-white/60 text-xs">Study Hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Residential Rules */}
      <section className="py-20 bg-white">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="relative">
                <div className="absolute -inset-4 bg-blue/5 rounded-[3rem] rotate-1"></div>
                <div className="aspect-square bg-blue p-12 rounded-full flex flex-col items-center justify-center text-center">
                  <div className="text-white text-6xl font-bold mb-2">Hostel</div>
                  <div className="text-white/70 font-bold uppercase tracking-widest text-sm">Facilities Available</div>
                  <div className="w-12 h-1 bg-white/20 my-4"></div>
                  <p className="text-white text-xs px-6 font-medium italic">Separate safe campuses for Boys and Girls pursuing academic excellence.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-4xl font-bold mb-6">Campus <span className="text-blue italic">Life</span></h2>
              <p className="text-ink/65 text-lg leading-relaxed mb-10">
                Our hostels are more than just accommodation — they are vibrant communities where students build lifelong friendships, develop independence, and grow into well-rounded individuals ready to face the world.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-blue flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-blue"></span> Separate Campuses
                  </h4>
                  <p className="text-ink/50 text-sm">Dedicated residential and academic campuses for Boys and Girls to ensure total focus and safety.</p>
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
