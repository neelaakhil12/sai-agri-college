import { Trophy, Users, Microscope, BadgeCheck, Leaf } from "lucide-react";

const stats = [
  { Icon: Trophy,        num: "9+",        numColor: "#fde68a", lbl: "Years of Excellence" },
  { Icon: Users,         num: "40",        numColor: "#fff",    lbl: "Students Per Batch" },
  { Icon: Leaf,          num: "B.Sc",      numColor: "#fff",    lbl: "Agri. Specialization" },
  { Icon: Microscope,    num: "M.Sc",      numColor: "#fff",    lbl: "Research Programs" },
  { Icon: BadgeCheck,    num: "Recognised",numColor: "#fde68a", lbl: "Govt. Institution" },
];

export default function StatsBand() {
  return (
    <div className="bg-ink py-7 md:py-11">
      <div className="max-w-site mx-auto px-5 md:px-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6 sm:gap-y-8 lg:gap-0">
        {stats.map((s, i) => (
          <div key={i} className="text-center px-3 border-white/[.07]
            lg:border-r lg:last:border-r-0
            [&:nth-child(even)]:border-l sm:[&:nth-child(even)]:border-l-0
            sm:[&:nth-child(3n-1)]:border-l sm:[&:nth-child(3n)]:border-l lg:sm:[&:nth-child(n)]:border-l-0">
            <s.Icon size={20} className="mx-auto mb-[8px] md:mb-[10px] text-white/50 md:size-[24px]" />
            <span className="font-lora text-[1.5rem] md:text-[2rem] font-bold block leading-none"
              style={{ color: s.numColor }}>
              {s.num}
            </span>
            <span className="text-[0.65rem] md:text-[0.72rem] text-white/50 uppercase tracking-[.07em] mt-[6px] block">
              {s.lbl}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
