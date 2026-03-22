import { Building2, BookOpen, FlaskConical, Trophy, GraduationCap } from "lucide-react";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

const items = [
  { bg: "linear-gradient(135deg,#0b1220,#1347a0)", Icon: Building2,     sub: "Main Campus · Champapet", label: "Champapet Campus, Hyderabad – 500 079", span2: true },
  { bg: "linear-gradient(135deg,#041a0e,#0e7c4b)", Icon: BookOpen,      sub: "",                        label: "Study Hall & NCERT Library" },
  { bg: "linear-gradient(135deg,#1a0e04,#c8900a)", Icon: FlaskConical,  sub: "",                        label: "Science Laboratories" },
  { bg: "linear-gradient(135deg,#1a0520,#7c3aed)", Icon: Trophy,        sub: "",                        label: "Awards & Results Day" },
  { bg: "linear-gradient(135deg,#041220,#0284c7)", Icon: GraduationCap, sub: "",                        label: "IIT · NIT · MBBS Achievers" },
];

export default function Gallery() {
  return (
    <section className="py-[60px] md:py-[78px] bg-cream">
      <div className="max-w-site mx-auto px-5 md:px-7">
        <Reveal className="text-center max-w-[460px] mx-auto mb-10">
          <SectionHeader label="Campus Life" title='Life at <em>SRI Aakash</em>' center />
        </Reveal>

        {/* Mobile: simple 2-col grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.07} className="rounded-xl overflow-hidden relative cursor-pointer h-[140px]">
              <div className="w-full h-full flex flex-col items-center justify-center gap-2"
                style={{ background: item.bg }}>
                <item.Icon size={28} className="text-white/50" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2 text-white text-[0.7rem] font-semibold"
                style={{ background: "linear-gradient(to top,rgba(0,0,0,.65),transparent)" }}>
                {item.label}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Desktop: masonry-style grid */}
        <div className="hidden md:grid gap-3"
          style={{ gridTemplateColumns: "repeat(4,1fr)", gridTemplateRows: "180px 180px" }}>
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.07}
              className={`rounded-xl overflow-hidden relative cursor-pointer ${item.span2 ? "col-span-2 row-span-2" : ""}`}>
              <div className="w-full h-full flex flex-col items-center justify-center gap-[10px]
                transition-transform duration-[400ms] hover:scale-[1.04]"
                style={{ background: item.bg }}>
                <item.Icon size={item.span2 ? 48 : 32} className="text-white/50" />
                {item.sub && <span className="font-lora italic text-[0.8rem] text-white/40">{item.sub}</span>}
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-[14px] py-[10px] text-white text-[0.75rem] font-semibold"
                style={{ background: "linear-gradient(to top,rgba(0,0,0,.65),transparent)" }}>
                {item.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
