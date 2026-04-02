import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import Contact from "../components/sections/Contact";

const API_URL = '';

const staticTestimonials = [
  { initials: "KR", studentName: "K. Rakesh",    achievement: "B.Sc Agriculture Scholar",   quote: "The personalized attention at Sri Sai Institute made all the difference in my research projects. The faculty guided me through complex soil science analysis personally every single day. I'm now pursuing advanced studies with complete confidence.", stars: 5 },
  { initials: "SA", studentName: "S. Anusha",  achievement: "M.Sc Research Fellow",     quote: "I never felt overwhelmed by the scientific curriculum because of the structured field visits and lab hours. When I struggled with Plant Pathology, the professors provided extra individual sessions. That kind of focus is rare.", stars: 5 },
  { initials: "MR", studentName: "M. Rahul",  achievement: "Agri-Business Professional",   quote: "The practical field training at Sri Sai Institute showed me exactly how theory translates into real-world farming solutions. By the time I graduated, I already had a deep understanding of sustainable agriculture practices.", stars: 5 },
];

export default function TestimonialsPage() {
  const [data, setData] = useState(staticTestimonials);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/testimonials`);
        const filteredApi = res.data.filter(t => !t.achievement?.includes("IIT") && !t.achievement?.includes("MBBS") && !t.achievement?.includes("NEET") && !t.achievement?.includes("MPC") && !t.achievement?.includes("BiPC"));
        setData([...filteredApi, ...staticTestimonials]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-cream min-h-screen">
      <PageHeader 
        title="Student Success Stories" 
        subtitle="Voices of our dedicated students pursuing excellence in agricultural sciences."
      />

      <section className="py-20 bg-white">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
             <span className="text-[0.72rem] font-bold text-blue uppercase tracking-[.12em] mb-3 block">Student Experiences</span>
             <h2 className="font-lora text-3xl md:text-5xl font-bold text-ink leading-[1.2] mb-6">
               What Our <em className="text-blue">Scholars</em> Say
             </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-cream border border-[#e2e8f0] rounded-2xl p-8 h-full flex flex-col hover:border-blue hover:shadow-lg transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.stars || 5)].map((_, j) => (
                      <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-ink/75 italic text-lg leading-relaxed mb-8 flex-grow">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-ink/5">
                    <div className="w-12 h-12 rounded-full bg-sky flex items-center justify-center font-bold text-blue">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold text-ink">{t.studentName}</div>
                      <div className="text-sm text-blue/70 font-medium">{t.achievement}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
