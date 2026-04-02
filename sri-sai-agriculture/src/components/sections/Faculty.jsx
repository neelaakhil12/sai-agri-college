import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

const facultyList = [
  { initials: "DV", name: "Divi Vamsi Krishna",  role: "Faculty" },
  { initials: "SR", name: "Sudhineedi Ramesh",    role: "Faculty" },
  { initials: "PT", name: "Patchala Thomas",      role: "Faculty" },
];

function FacultyCard({ f, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="h-full p-6 md:p-8 bg-white border-[1.5px] border-[#e2e8f0] rounded-2xl
        transition-all duration-200 hover:border-blue hover:shadow-lg flex flex-col items-center text-center">
        <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center
          text-white font-lora font-bold text-[1.3rem] mb-4 shrink-0"
          style={{ background: "linear-gradient(135deg,#15803d,#0b1220)" }}>
          {f.initials}
        </div>
        <span className="font-bold text-[1rem] text-ink block mb-1">{f.name}</span>
        <span className="text-[0.75rem] text-blue font-semibold uppercase tracking-[.07em]">{f.role}</span>
      </div>
    </Reveal>
  );
}

export default function Faculty() {
  return (
    <section id="faculty" className="py-[60px] md:py-[78px] bg-white">
      <div className="max-w-site mx-auto px-5 md:px-7">
        <Reveal className="mb-[30px]">
          <SectionHeader
            label="⑤ Faculty Profiles"
            title='Our <em>Dedicated</em> Faculty'
            subtitle="Our experienced educators bring deep subject knowledge and a passion for student success."
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {facultyList.map((f, i) => (
            <FacultyCard key={f.name} f={f} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
