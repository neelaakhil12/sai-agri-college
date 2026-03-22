import { Users, Home, ShieldCheck, BookOpen, ClipboardList, BarChart2, Moon, Zap, Landmark } from "lucide-react";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

const features = [
  { Icon: Users,         title: "Limited Batches of 40",              desc: "Every class is strictly capped at 40 students. Your teacher knows your name, your strengths, and your weak spots." },
  { Icon: Home,          title: "Separate Boys Campus & Hostel",       desc: "A dedicated residential campus for boys with structured routines and a distraction-free environment." },
  { Icon: ShieldCheck,   title: "Separate Girls Campus & Hostel",      desc: "A safe, purpose-built residential campus exclusively for girls pursuing JEE, NEET, or Commerce tracks." },
  { Icon: BookOpen,      title: "Comprehensive NCERT Study Materials", desc: "Carefully curated, NCERT-aligned study materials for every stream. Deep reading and concept mastery." },
  { Icon: ClipboardList, title: "Daily Assignments & Weekly Tests",    desc: "Structured daily assignments reinforce classroom learning. Weekly tests identify gaps early." },
  { Icon: BarChart2,     title: "Cumulative Tests with Expert Analysis", desc: "Regular cumulative assessments followed by in-depth subject analysis sessions by experienced faculty." },
  { Icon: Moon,          title: "Supervised Evening Study Hours",      desc: "Evening sessions supervised directly by senior faculty, ensuring productive engagement outside class." },
  { Icon: Zap,           title: "Monthly Motivational Sessions",       desc: "Monthly mentoring sessions keep students mentally strong and resilient throughout the year." },
  { Icon: Landmark,      title: "Government Recognised Institution",   desc: "Officially recognised by the Government of Telangana (College Code: 58471)." },
];

export default function Features() {
  return (
    <section className="py-[60px] md:py-[78px] bg-ink relative overflow-hidden feat-section-bg">
      <div className="max-w-site mx-auto px-5 md:px-7 relative">
        <Reveal className="text-center max-w-[540px] mx-auto">
          <SectionHeader
            label="④ Key Features & Facilities"
            title='Built for <em>Deep Learning</em><br/>and Real Results'
            center light
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px] mt-10 md:mt-11">
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="p-[22px] md:p-[26px] rounded-2xl transition-all duration-[250ms]
                hover:border-[rgba(147,197,253,.3)] hover:-translate-y-[3px]"
                style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
                <div className="w-[48px] h-[48px] md:w-[52px] md:h-[52px] rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}>
                  <f.Icon size={20} className="text-[#93c5fd]" />
                </div>
                <h4 className="text-[0.9rem] md:text-[0.92rem] font-bold text-white mb-2">{f.title}</h4>
                <p className="text-[0.8rem] md:text-[0.82rem] text-white/50 leading-[1.65]">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
