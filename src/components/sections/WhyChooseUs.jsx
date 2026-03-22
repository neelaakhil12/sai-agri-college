import { Users, Home, BarChart2, BookOpen, Moon, Zap, Target, Trophy, Landmark, Leaf } from "lucide-react";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

const items = [
  { Icon: Users,    title: "Batches of 40 Students",        desc: "Every class is strictly capped — your teacher knows your name and your gaps." },
  { Icon: Home,     title: "Separate Boys & Girls Hostels",  desc: "Dedicated residential campuses for boys and girls with structured routines." },
  { Icon: BarChart2,title: "Daily Tests & Expert Analysis",  desc: "Daily assignments, weekly tests and cumulative exams with subject expert review." },
  { Icon: BookOpen, title: "NCERT Study Materials",          desc: "Comprehensive, curriculum-aligned resources for every stream and exam." },
  { Icon: Moon,     title: "Supervised Study Hours",         desc: "Evening sessions supervised by senior faculty for consistent daily progress." },
  { Icon: Zap,      title: "Monthly Motivation Sessions",    desc: "Regular mentoring to keep students mentally strong through competitive prep." },
  { Icon: Target,   title: "Victory Path for JEE & NEET",   desc: "Proven philosophy — a structured victory path for JEE (Main), NEET & CPT-CMA." },
  { Icon: Trophy,   title: "IIT, NIT & MBBS Track Record",  desc: "9+ years of consistent selections in India's premier institutions." },
  { Icon: Landmark, title: "Govt. of Telangana Recognised", desc: "Fully accredited institution. College Code: 58471. Your certificate is valid." },
  { Icon: Leaf,     title: "Peaceful Campus Environment",    desc: "A quiet, distraction-free environment engineered for deep, focused study." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-[60px] md:py-[78px] bg-cream">
      <div className="max-w-site mx-auto px-5 md:px-7">
        <Reveal className="text-center max-w-[520px] mx-auto mb-10 md:mb-11">
          <SectionHeader label="Why Choose Us" title='What Makes <em>SRI Aakash</em> Different' center />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[14px] md:gap-[18px]">
          {items.map((item, i) => (
            <Reveal key={i} delay={(i % 5) * 0.06}>
              <div className="px-[14px] md:px-[18px] py-[18px] md:py-[22px] bg-white border-[1.5px] border-[#e2e8f0]
                rounded-2xl text-center transition-all duration-[250ms]
                hover:border-blue hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(19,71,160,.10)]">
                <div className="w-[46px] h-[46px] md:w-[54px] md:h-[54px] rounded-2xl bg-sky mx-auto mb-[10px] md:mb-[13px]
                  flex items-center justify-center">
                  <item.Icon size={20} className="text-blue" />
                </div>
                <h4 className="text-[0.8rem] md:text-[0.86rem] font-bold text-ink leading-[1.35]">{item.title}</h4>
                <p className="text-[0.7rem] md:text-[0.74rem] text-muted leading-[1.55] mt-[5px]">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
