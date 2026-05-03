import { Link } from "react-router-dom";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import ZoomableImage from "../ui/ZoomableImage";

const courses = [
  "B.Sc Agriculture",
  "M.Sc Agriculture",
  "M.Sc Biology",
  "M.Sc Chemistry",
  "M.Sc Zoology",
];

const whyUs = [
  { icon: "👨‍🏫", text: "Experienced & Dedicated Research Faculty" },
  { icon: "🔬", text: "Practical & Field-Based Learning" },
  { icon: "🏛️", text: "Modern Agriculture Lab Facilities" },
  { icon: "🎯", text: "Career-Oriented Professional Training" },
  { icon: "🤝", text: "Personalized Research Support" },
];

export default function About() {
  return (
    <section id="about" className="py-[60px] md:py-[78px] bg-white">
      <div className="max-w-site mx-auto px-5 md:px-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[68px] items-start">

          <Reveal className="relative pb-6">
            <div className="w-full rounded-2xl overflow-hidden relative"
              style={{ aspectRatio: "4/3" }}>
              <ZoomableImage
                src="/about.png"
                alt="Sri Sai Institute of Agriculture Sciences Campus"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
              {/* Courses overlay badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <div className="text-[0.6rem] font-black text-blue uppercase tracking-wider mb-2">Programs Offered</div>
                {courses.map((c, i) => (
                  <div key={i} className="text-[0.68rem] font-semibold text-ink flex items-center gap-1.5 leading-[1.8]">
                    <span className="text-blue">✓</span> {c}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-2 -right-1 md:-right-2 bg-white border-2 border-[#e2e8f0]
              rounded-2xl px-3 md:px-[22px] py-3 md:py-[18px]
              shadow-[0_8px_28px_rgba(0,0,0,.1)] flex items-center gap-[10px] md:gap-[14px] z-[2]">
              <div className="font-lora text-[1.5rem] md:text-[2rem] font-bold text-blue leading-none">9+</div>
              <div className="text-[0.68rem] md:text-[0.75rem] text-[#374151] leading-[1.4]">
                <strong className="block font-bold text-ink text-[0.72rem] md:text-[0.82rem]">Years of Excellence</strong>
                Empowering Agri-Professionals
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="pt-1">
            <SectionHeader label="About Our Institute" title='Excellence in <em>Agricultural</em> Sciences' />

            <div className="mt-5 mb-5 px-[18px] md:px-[22px] py-4 md:py-5 bg-sky2 border-l-4 border-blue rounded-r-xl">
              <p className="font-lora italic text-[0.98rem] md:text-[1.05rem] text-blue2 m-0 leading-[1.6]">
                "Empowering students with practical knowledge, research skills, and industry-focused agricultural education."
              </p>
              <span className="block text-[0.7rem] md:text-[0.72rem] font-bold text-blue uppercase tracking-[.08em] mt-[6px]">
                — Sri Sai Institute of Agriculture Sciences
              </span>
            </div>

            <p className="text-[0.9rem] md:text-[0.92rem] text-[#374151] leading-[1.82] mb-[14px]">
              We offer comprehensive undergraduate and postgraduate programs designed to shape future scientists
              and agriculture professionals. Sri Sai Institute provides advanced B.Sc and M.Sc degrees in
              Agriculture, Biology, Chemistry, and Zoology through rigorous scientific training.
            </p>

            {/* Why Choose Us */}
            <div className="mt-4 mb-6">
              <h3 className="text-[0.78rem] font-black text-ink uppercase tracking-[.1em] mb-3">Why Study With Us?</h3>
              <div className="grid grid-cols-1 gap-2">
                {whyUs.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-cream border border-[#e2e8f0] text-[0.84rem] font-medium text-ink">
                    <span className="text-lg">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <Link to="/about"
              className="inline-flex items-center gap-2 bg-blue text-white px-5 py-3 rounded-[9px]
                font-bold text-[0.85rem] no-underline transition-all duration-200
                hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(19,71,160,.35)]">
              Learn More About Us →
            </Link>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
