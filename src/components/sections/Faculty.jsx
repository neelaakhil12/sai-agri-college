import { useState, useEffect } from "react";
import axios from "axios";
import { departments, faculty as staticFaculty } from "../../data/faculty";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

const API_URL = 'http://localhost:5000';

function FacultyCard({ f, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="h-full p-4 md:p-5 bg-white border-[1.5px] border-[#e2e8f0] rounded-2xl
        transition-all duration-200 hover:border-blue hover:bg-sky flex flex-col">
        {f.image ? (
          <img 
            src={f.image && f.image.startsWith('http') ? f.image : `${API_URL}${f.image}`} 
            alt={f.name} 
            className="w-[50px] h-[50px] rounded-full object-cover mb-3" 
          />
        ) : (
          <div className="w-[46px] h-[46px] md:w-[50px] md:h-[50px] rounded-full flex items-center justify-center
            text-white font-lora font-bold text-[0.9rem] md:text-[0.95rem] mb-3 shrink-0"
            style={{ background: "linear-gradient(135deg,#1347a0,#0b1220)" }}>
            {f.initials}
          </div>
        )}
        <span className="font-bold text-[0.85rem] md:text-[0.87rem] text-ink block mb-[3px]">{f.name}</span>
        <span className="text-[0.68rem] md:text-[0.7rem] text-blue font-bold uppercase tracking-[.07em] block">
          {f.dept || f.department}
        </span>
        <div className="flex items-center gap-[5px] mt-auto pt-3 text-[0.72rem] md:text-[0.74rem] text-muted font-medium
          before:content-[''] before:w-[7px] before:h-[7px] before:bg-[#22c55e] before:rounded-full before:flex-shrink-0">
          {f.exp || f.experience}
        </div>
      </div>
    </Reveal>
  );
}

export default function Faculty() {
  const [active, setActive] = useState("math");
  const [dynamicFaculty, setDynamicFaculty] = useState({});
  useScrollReveal([active]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/faculty`);
        const grouped = res.data.reduce((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {});
        setDynamicFaculty(grouped);
      } catch (err) {
        console.error("Error fetching faculty:", err);
      }
    };
    fetchFaculty();
  }, []);

  const mergedFaculty = {};
  departments.forEach(dept => {
    // If we have dynamic faculty for this category, use it. Otherwise use static.
    if (dynamicFaculty[dept.id] && dynamicFaculty[dept.id].length > 0) {
      mergedFaculty[dept.id] = dynamicFaculty[dept.id];
    } else {
      mergedFaculty[dept.id] = staticFaculty[dept.id] || [];
    }
  });

  return (
    <section id="faculty" className="py-[60px] md:py-[78px] bg-white">
      <div className="max-w-site mx-auto px-5 md:px-7">
        <Reveal className="mb-[30px]">
          <SectionHeader
            label="⑤ Faculty Profiles"
            title='Department Leads with<br/><em>Decades of Expertise</em>'
            subtitle="Our faculty carry between 11 and 35 years of subject mastery — not just teaching experience, but competitive exam expertise."
          />
        </Reveal>

        <Reveal>
          <div className="flex gap-2 flex-wrap mb-8">
            {departments.map((d) => (
              <button key={d.id} onClick={() => setActive(d.id)}
                className="px-[14px] md:px-[17px] py-[7px] md:py-2 rounded-full border-[1.5px]
                  text-[0.76rem] md:text-[0.79rem] font-semibold cursor-pointer transition-all duration-200"
                style={{
                  background:  active === d.id ? "#0b1220" : "#fff",
                  borderColor: active === d.id ? "#0b1220" : "#e2e8f0",
                  color:       active === d.id ? "#fff"    : "#6b7280",
                }}>
                {d.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[14px]">
          {(mergedFaculty[active] || []).map((f, i) => (
            <FacultyCard key={f.name + i} f={f} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
