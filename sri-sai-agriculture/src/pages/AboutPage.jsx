import React, { useEffect } from "react";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import Contact from "../components/sections/Contact";

const whyChooseUs = [
  { icon: "👨‍🏫", title: "Experienced & Dedicated Research Faculty", desc: "Our team of expert educators brings deep scientific knowledge and a passion for student research success." },
  { icon: "🔬", title: "Practical & Field-Based Learning", desc: "Hands-on biological experiments, field visits, and agricultural research projects are central to our curriculum." },
  { icon: "🏛️", title: "Modern Agriculture Lab Facilities", desc: "State-of-the-art laboratories equipped with the latest instruments for Agriculture, Biology, Chemistry, and Zoology." },
  { icon: "🎯", title: "Career-Oriented Professional Training", desc: "We bridge the gap between academic theory and agricultural industry with specialized internships and placement support." },
  { icon: "🤝", title: "Personalized Research Support", desc: "Small batch sizes ensure every student receives individual attention, research mentoring, and scientific guidance." },
];

const courses = [
  { code: "UG", name: "B.Sc Agriculture", duration: "4 Years", type: "Undergraduate" },
  { code: "PG", name: "M.Sc Agriculture", duration: "2 Years", type: "Postgraduate" },
  { code: "PG", name: "M.Sc Biology",     duration: "2 Years", type: "Postgraduate" },
  { code: "PG", name: "M.Sc Chemistry",   duration: "2 Years", type: "Postgraduate" },
  { code: "PG", name: "M.Sc Zoology",     duration: "2 Years", type: "Postgraduate" },
];

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-cream min-h-screen">
      <PageHeader
        title="About Our Institute"
        subtitle="Empowering students with practical knowledge, research skills, and industry-focused agricultural education."
      />

      {/* ── Mission Statement ── */}
      <section className="py-20 bg-white">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[0.72rem] font-bold text-blue uppercase tracking-[.12em] mb-3 block">① Excellence in Agricultural Education</span>
            <h2 className="font-lora text-3xl md:text-5xl font-bold text-ink leading-[1.2] mb-6">
              Build Your Future with <em className="text-blue">Advanced Agriculture</em> &amp; Science Programs
            </h2>
            <div className="mt-5 px-6 py-4 bg-sky2 border-l-4 border-blue rounded-r-xl text-left">
              <p className="font-lora italic text-[1rem] md:text-[1.1rem] text-blue2 m-0 leading-[1.65]">
                "Empowering students with practical knowledge, research skills, and industry-focused education."
              </p>
            </div>
            <p className="text-ink/65 text-lg leading-relaxed mt-6">
              We offer comprehensive undergraduate and postgraduate programs designed to shape future scientists
              and agriculture professionals. Sri Sai Institute of Agriculture Sciences is a premier destination
              for higher scientific learning and research excellence.
            </p>
          </Reveal>

          {/* Stats row */}
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
              {[
                { num: "9+",  lbl: "Years of Excellence" },
                { num: "5",   lbl: "Specialized Programs" },
                { num: "100+", lbl: "Research Alumni" },
                { num: "3",   lbl: "Expert Faculty" },
              ].map((s, i) => (
                <div key={i} className="text-center p-6 rounded-2xl border border-[#e2e8f0] bg-cream hover:border-blue hover:shadow-md transition-all">
                  <div className="font-lora text-3xl font-bold text-blue">{s.num}</div>
                  <div className="text-xs font-bold text-ink/55 uppercase tracking-wider mt-2">{s.lbl}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[0.72rem] font-bold text-blue uppercase tracking-[.12em] mb-3 block">② Why Choose Our Institute</span>
            <h2 className="font-lora text-3xl md:text-4xl font-bold text-ink">
              What Makes <em className="text-blue">Sri Sai Agri</em> Different
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-7 hover:border-blue hover:shadow-lg transition-all duration-200 h-full">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-ink text-[1rem] mb-2">{item.title}</h3>
                  <p className="text-ink/60 text-[0.88rem] leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses Offered ── */}
      <section className="py-20 bg-[#0b1220] text-white">
        <div className="max-w-site mx-auto px-5 md:px-7">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[0.72rem] font-bold text-[#93c5fd] uppercase tracking-[.12em] mb-3 block">③ Academic Programs</span>
            <h2 className="font-lora text-3xl md:text-4xl font-bold text-white">
              Degrees <em className="text-[#fde68a]">Offered</em>
            </h2>
            <p className="text-white/55 mt-4 text-[0.92rem] leading-relaxed">
              Our professional programs are designed to give students a competitive edge in Agriculture and Life Sciences.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl p-6 border border-white/10 hover:border-[#fde68a]/50 hover:bg-white/5 transition-all duration-200"
                  style={{ background: "rgba(255,255,255,.05)" }}>
                  <span className={`text-[0.62rem] font-black uppercase tracking-[.12em] px-3 py-1 rounded-full mb-4 inline-block
                    ${c.code === "UG" ? "bg-blue/20 text-[#93c5fd]" : "bg-[#fde68a]/15 text-[#fde68a]"}`}>
                    {c.type}
                  </span>
                  <h3 className="font-lora font-bold text-xl text-white mt-2 mb-1">{c.name}</h3>
                  <p className="text-white/45 text-[0.8rem]">Duration: {c.duration}</p>
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <a href="#contact" className="text-[0.8rem] font-bold text-blue hover:text-[#93c5fd] transition-colors">
                      Enquire Now →
                    </a>
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
