import { useState, useEffect } from "react";
import axios from "axios";
import { programs as staticPrograms } from "../../data/programs";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

const API_URL = 'http://localhost:5000';

const headStyles = {
  mpc:  "linear-gradient(130deg,#07102a,#1347a0)",
  bipc: "linear-gradient(130deg,#041a0e,#0e7c4b)",
  mec:  "linear-gradient(130deg,#1a0e04,#b07d0a)",
  engineering: "linear-gradient(130deg,#07102a,#1347a0)",
  medical: "linear-gradient(130deg,#041a0e,#0e7c4b)",
  commerce: "linear-gradient(130deg,#1a0e04,#b07d0a)",
};
const dotColors  = { blue: "#1347a0", green: "#0e7c4b", gold: "#b07d0a" };
const eligColors = {
  mpc:  { bg: "#e8f0fe", border: "#1347a0", text: "#1347a0" },
  bipc: { bg: "#ecfdf5", border: "#0e7c4b", text: "#0e7c4b" },
  mec:  { bg: "#fffbeb", border: "#b07d0a", text: "#b07d0a" },
  engineering:  { bg: "#e8f0fe", border: "#1347a0", text: "#1347a0" },
  medical: { bg: "#ecfdf5", border: "#0e7c4b", text: "#0e7c4b" },
  commerce: { bg: "#fffbeb", border: "#b07d0a", text: "#b07d0a" },
};
const streamColors = {
  engineering: "blue",
  medical: "green",
  commerce: "gold"
};

const tabs = [
  { id: "all",  label: "All Streams" },
  { id: "engineering",  label: "Engineering" },
  { id: "medical", label: "Medical" },
  { id: "commerce",  label: "Commerce" },
];

function ProgramCard({ p, delay = 0 }) {
  const colorKey = p.color || streamColors[p.stream?.toLowerCase()] || "blue";
  const ec = eligColors[p.id] || eligColors[p.stream?.toLowerCase()] || eligColors.mpc;
  const lc = dotColors[colorKey];
  const dc = dotColors[colorKey];
  
  return (
    <Reveal delay={delay} className="h-full">
      <div className="border-[1.5px] border-[#e2e8f0] rounded-2xl overflow-hidden bg-white h-full flex flex-col
        transition-all duration-[250ms] hover:-translate-y-[5px]
        hover:shadow-[0_18px_48px_rgba(0,0,0,.10)] hover:border-transparent">
        <div className="px-6 pt-7 pb-[22px] relative overflow-hidden" style={{ background: headStyles[p.id] || headStyles[p.stream?.toLowerCase()] }}>
          <div className="absolute top-[6px] right-3 font-lora text-[3.5rem] font-black text-white/[.08] leading-none">
            {p.stream || p.id}
          </div>
          <span className="inline-block text-[0.67rem] font-bold tracking-[.09em] uppercase px-[10px] py-1 rounded mb-[11px]"
            style={{
              background: colorKey === "blue" ? "rgba(147,197,253,.2)" : colorKey === "green" ? "rgba(52,211,153,.2)" : "rgba(251,191,36,.2)",
              color: colorKey === "blue" ? "#93c5fd" : colorKey === "green" ? "#34d399" : "#fbbf24",
            }}>
            {p.badge || p.stream}
          </span>
          <h3 className="font-lora text-[1.2rem] text-white mb-[6px] relative"
            dangerouslySetInnerHTML={{ __html: (p.title || "").replace("&", "&amp;") }} />
          <p className="text-[0.78rem] text-white/50 leading-[1.5] relative">{p.desc || p.description}</p>
        </div>
        <div className="px-6 pt-5 pb-6 flex flex-col flex-1">
          {p.image && (
            <img 
              src={p.image.startsWith('http') ? p.image : `${API_URL}${p.image}`} 
              className="w-full h-32 object-cover rounded-xl mb-4" 
              alt="" 
            />
          )}
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
  const [active, setActive] = useState("all");
  const [allPrograms, setAllPrograms] = useState(staticPrograms);
  useScrollReveal([active]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/courses`);
        setAllPrograms([...staticPrograms, ...res.data]);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const filtered = active === "all" ? allPrograms : allPrograms.filter((p) => (p.id === active || p.stream?.toLowerCase() === active));

  return (
    <section id="programs" className="py-[60px] md:py-[78px] bg-cream overflow-hidden">
      <div className="max-w-site mx-auto px-5 md:px-7">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-[14px]">
            <SectionHeader label="③ Academic Programs" title='Our Streams &amp; <em>Specialisations</em>' />
            <p className="text-[0.85rem] md:text-[0.9rem] text-muted leading-[1.75] lg:max-w-[340px] lg:text-right">
              Three focused streams. One mission — your competitive exam success.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="overflow-x-auto pb-4 mb-5 md:mb-7 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
            <div className="flex gap-2 min-w-max">
              {tabs.map((t) => (
                <button key={t.id} onClick={() => setActive(t.id)}
                  className="px-4 md:px-5 py-[8px] md:py-[9px] rounded-lg border-[1.5px] font-sora
                    text-[0.8rem] md:text-[0.82rem] font-semibold cursor-pointer transition-all duration-200"
                  style={{
                    background:   active === t.id ? "#1347a0" : "#fff",
                    borderColor:  active === t.id ? "#1347a0" : "#e2e8f0",
                    color:        active === t.id ? "#fff"    : "#6b7280",
                  }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className={`grid gap-[22px]
          ${filtered.length === 1 ? "grid-cols-1 max-w-sm" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
          {filtered.map((p, i) => (
            <ProgramCard key={p.id || p._id} p={p} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
