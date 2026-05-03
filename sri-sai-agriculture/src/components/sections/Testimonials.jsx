import { useState, useEffect } from "react";
import axios from "axios";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

const API_URL = 'http://localhost:5000';

const staticTestimonials = [
  { initials: "KR", student_name: "K. Rakesh",    achievement: "B.Sc Agriculture Scholar",   quote: "The personalized attention at Sri Sai Institute made all the difference in my research projects. The faculty guided me through complex soil science analysis personally every single day. I'm now pursuing advanced studies with complete confidence.", stars: 5 },
  { initials: "SA", student_name: "S. Anusha",  achievement: "M.Sc Research Fellow",     quote: "I never felt overwhelmed by the scientific curriculum because of the structured field visits and lab hours. When I struggled with Plant Pathology, the professors provided extra individual sessions. That kind of focus is rare.", stars: 5 },
  { initials: "MR", student_name: "M. Rahul",  achievement: "Agri-Business Professional",   quote: "The practical field training at Sri Sai Institute showed me exactly how theory translates into real-world farming solutions. By the time I graduated, I already had a deep understanding of sustainable agriculture practices.", stars: 5 },
];

export default function Testimonials() {
  const [data, setData] = useState(staticTestimonials);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/testimonials`);
        if (res.data && res.data.length > 0) {
           setData([...res.data, ...staticTestimonials]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-[60px] md:py-[78px] bg-white overflow-hidden">
      <div className="max-w-site mx-auto px-5 md:px-7 mb-10">
        <Reveal className="text-center max-w-[550px] mx-auto">
          <SectionHeader 
            label="⑤ Student Testimonials" 
            title='Voices of <em>Academic Research</em>' 
            center 
          />
        </Reveal>
      </div>

      <div className="overflow-hidden marquee-track w-full">
        <div className="flex marquee-left" style={{ width: "max-content" }}>
          {[...data, ...data].map((t, i) => (
            <div key={i} className="p-[22px] md:p-[26px] bg-cream border-[1.5px] border-[#e2e8f0] rounded-2xl w-[340px] md:w-[420px] flex-shrink-0 mx-3 flex flex-col items-start hover:border-blue transition-all">
                <div className="flex gap-[3px] mb-3">
                  {[...Array(t.stars || 5)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <blockquote className="text-[0.82rem] md:text-[0.88rem] text-[#374151] leading-[1.65] italic mb-[18px]">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 w-full">
                  <div className="w-[38px] h-[38px] rounded-full bg-sky flex items-center justify-center font-bold text-[0.82rem] text-blue">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[0.85rem] text-ink truncate">{t.student_name || t.studentName}</div>
                    <div className="text-[0.7rem] text-muted truncate">{t.achievement}</div>
                  </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
