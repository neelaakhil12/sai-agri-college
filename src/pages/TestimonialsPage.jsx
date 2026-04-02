import React, { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import SectionHeader from "../components/ui/SectionHeader";

const API_URL = 'http://localhost:5000';

const staticTestimonials = [
  { initials: "BG", studentName: "B. Geetha",    achievement: "IIT Palakkad · MPC Batch",   quote: "The Super-40 batch made all the difference. My teacher in Physics knew exactly where I was struggling and gave individual attention every single day. I got into IIT Palakkad because of that focus.", stars: 5 },
  { initials: "ES", studentName: "E. Sindhuja",  achievement: "MBBS · BIPC NEET Batch",     quote: "I never felt behind because of supervised study hours and weekly tests. When I struggled with Biology, Dr. Suman gave extra sessions personally. That kind of attention simply doesn't exist in bigger colleges.", stars: 5 },
  { initials: "GT", studentName: "G. Teja Sai",  achievement: "NIT Warangal · MPC Batch",   quote: "The cumulative test analysis sessions showed me exactly which chapters needed more work each month. By the time JEE day arrived, I had no surprises. Sri Aakash built my foundation properly.", stars: 5 },
];

export default function TestimonialsPage() {
  const [data, setData] = useState(staticTestimonials);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="bg-cream min-h-screen">
      <PageHeader 
        title="Student Voices" 
        subtitle="Real stories from our students about their journey with Sri Aakash Academy."
        bgImage="/58471.JPG.jpeg"
      />

      <section className="py-20 bg-white">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <Reveal className="mb-14 text-center">
            <SectionHeader 
               label="Success Stories" 
               title="Voices Of <em>Aakashian</em> Excellence" 
               center 
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((t, i) => (
              <Reveal key={t._id || i} delay={i * 0.05}>
                <div className="bg-cream p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col items-start group">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.stars || 5)].map((_, j) => (
                      <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>
                  <blockquote className="text- ink text-base italic leading-relaxed mb-6 font-medium">
                     "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100 w-full">
                    {t.image ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue/20">
                            <img src={t.image.startsWith('http') ? t.image : `${API_URL}/${t.image}`} alt={t.studentName} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-blue/10 flex items-center justify-center font-bold text-blue text-sm">
                            {t.initials}
                        </div>
                    )}
                    <div className="min-w-0">
                      <div className="font-bold text-ink truncate text-sm">{t.studentName}</div>
                      <div className="text-xs text-blue font-bold truncate uppercase tracking-widest">{t.achievement}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
