import { useState, useEffect } from "react";
import axios from "axios";
import { programs as staticPrograms } from "../../data/programs";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

const API_URL = 'http://localhost:5000';

const headStyles = {
  "bsc-agri": "linear-gradient(130deg,#041a0e,#15803d)",
  "msc-agri": "linear-gradient(130deg,#041a0e,#065f46)",
  "msc-sciences": "linear-gradient(130deg,#0b1220,#15803d)",
};


const eligColors = {
  "bsc-agri": { bg: "#f0fdf4", border: "#15803d", text: "#15803d" },
  "msc-agri": { bg: "#f0fdf4", border: "#15803d", text: "#15803d" },
  "msc-sciences": { bg: "#f0fdf4", border: "#15803d", text: "#15803d" },
};

function ProgramCard({ p, delay = 0 }) {
  const ec = eligColors[p.id] || eligColors["bsc-agri"];
  const lc = "#15803d";
  const dc = "#15803d";
  
  return (
    <Reveal delay={delay} className="h-full">
      <div className="border-[1.5px] border-[#e2e8f0] rounded-2xl overflow-hidden bg-white h-full flex flex-col
        transition-all duration-[250ms] hover:-translate-y-[5px]
        hover:shadow-[0_18px_48px_rgba(0,0,0,.10)] hover:border-transparent">
        <div className="px-6 pt-7 pb-[22px] relative overflow-hidden" style={{ background: headStyles[p.id] || headStyles["bsc-agri"] }}>
          <div className="absolute top-[6px] right-3 font-lora text-[3.5rem] font-black text-white/[.08] leading-none">
            {p.stream || p.id}
          </div>
          <span className="inline-block text-[0.67rem] font-bold tracking-[.09em] uppercase px-[10px] py-1 rounded mb-[11px]"
            style={{
              background: "rgba(52,211,153,.2)",
              color: "#34d399",
            }}>
            {p.badge || p.stream}
          </span>
          <h3 className="font-lora text-[1.2rem] text-white mb-[6px] relative"
            dangerouslySetInnerHTML={{ __html: (p.title || "").replace("&", "&amp;") }} />
          <p className="text-[0.78rem] text-white/50 leading-[1.5] relative">{p.desc || p.description}</p>
        </div>
        <div className="px-6 pt-5 pb-6 flex flex-col flex-1">
          <ul className="list-none flex flex-col gap-2 mb-4 flex-1">
            {(p.exams || p.details || []).map((e, i) => (
              <li key={i} className="flex items-start gap-[10px] text-[0.84rem] font-medium text-[#374151] leading-[1.4]">
                <span className="w-2 h-2 rounded-[2px] flex-shrink-0 mt-[5px]" style={{ background: dc }} />
                <span>{typeof e === 'string' ? e : <><strong>{e.label}</strong> · {e.detail}</>}</span>
              </li>
            ))}
          </ul>
          {p.eligibility && (
            <div className="px-[13px] py-[11px] rounded-lg text-[0.77rem] font-semibold border-l-[3px]"
              style={{ background: ec.bg, borderColor: ec.border, color: ec.text }}>
              Eligibility: {p.eligibility}
            </div>
          )}
          <div className="flex items-center justify-between mt-[14px] pt-[14px] border-t border-[#e2e8f0]">
            <a href="#contact"
              className="text-[0.8rem] font-bold no-underline flex items-center gap-1 transition-all duration-200 hover:gap-2"
              style={{ color: lc }}>
              Enquire for {p.stream} →
            </a>
            {p.seatsLabel && (
              <span className="text-[0.72rem] font-bold text-orange bg-[#fff7ed] px-[9px] py-1 rounded-md border border-[#fed7aa]">
                {p.seatsLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Programs() {
  const [allPrograms, setAllPrograms] = useState(staticPrograms);
  useScrollReveal(["all"]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/courses`);
        // Filter out old courses from API if necessary
        const apiCourses = res.data.filter(c => !['mpc', 'bipc', 'mec'].includes(c.stream?.toLowerCase()));
        setAllPrograms([...staticPrograms, ...apiCourses]);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section id="programs" className="py-[60px] md:py-[78px] bg-cream overflow-hidden">
      <div className="max-w-site mx-auto px-5 md:px-7">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-[14px]">
            <SectionHeader label="Academic Programs" title='Our Agriculture &amp; <em>Science Degrees</em>' />
            <p className="text-[0.85rem] md:text-[0.9rem] text-muted leading-[1.75] lg:max-w-[400px] lg:text-right">
              Explore our comprehensive range of B.Sc and M.Sc programs designed for the future of agriculture.
            </p>
          </div>
        </Reveal>

        <div className={`grid gap-[22px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
          {allPrograms.map((p, i) => (
            <ProgramCard key={p.id || p._id} p={p} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
