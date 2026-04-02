import { Users, Home, BookOpen, Moon, Zap, Target, Trophy, Landmark, Leaf, FlaskConical } from "lucide-react";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

const items = [
  { Icon: Users,    title: "Batches of 40 Students",        desc: "Small classes ensure per-student focus in complex agriculture and science studies." },
  { Icon: Home,     title: "Separate Boys & Girls Hostels",  desc: "Dedicated residential campuses for boys and girls with structured academic routines." },
  { Icon: FlaskConical,title: "Advanced Research Labs",      desc: "Modern laboratory facilities for B.Sc and M.Sc science and agricultural research." },
  { Icon: BookOpen, title: "Specialized Study Materials",    desc: "In-depth, custom-designed resources for advanced agricultural science courses." },
  { Icon: Moon,     title: "Supervised Study Hours",         desc: "Staff-led evening sessions for students pursuing specialized scientific research." },
  { Icon: Zap,      title: "Interactive Field Learning",    desc: "Practical experience through regular visits to research plots and agri-fields." },
  { Icon: Target,   title: "Professional Career Path",     desc: "Structured academic training leading to careers in research and agri-business." },
  { Icon: Trophy,   title: "Strong Research Track Record",  desc: "9+ years of consistent academic success in scientific and agri-science domains." },
  { Icon: Landmark, title: "Govt. Recognised Institution",  desc: "Fully accredited science institute. College Code: 58471. Valid certification." },
  { Icon: Leaf,     title: "Peaceful Research Campus",     desc: "A distraction-free environment specifically engineered for deep scientific focus." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-[60px] md:py-[78px] bg-cream">
      <div className="max-w-site mx-auto px-5 md:px-7">
        <Reveal className="text-center max-w-[520px] mx-auto mb-10 md:mb-11">
          <SectionHeader label="Why Choose Us" title='What Makes <em>Sri Sai Agri</em> Different' center />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[14px] md:gap-[18px]">
          {items.map((item, i) => (
            <Reveal key={i} delay={(i % 5) * 0.06} className="h-full">
              <div className="px-[14px] md:px-[18px] py-[18px] md:py-[22px] bg-white border-[1.5px] border-[#e2e8f0]
                rounded-2xl text-center transition-all duration-[250ms] h-full flex flex-col
                hover:border-blue hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(19,71,160,.10)]">
                <div className="w-[46px] h-[46px] md:w-[54px] md:h-[54px] rounded-2xl bg-sky mx-auto mb-[10px] md:mb-[13px]
                  flex items-center justify-center">
                  <item.Icon size={20} className="text-blue" />
                </div>
                <h4 className="text-[0.8rem] md:text-[0.86rem] font-bold text-ink leading-[1.35]">{item.title}</h4>
                <p className="text-[0.7rem] md:text-[0.74rem] text-muted leading-[1.55] mt-[5px] mt-auto">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
