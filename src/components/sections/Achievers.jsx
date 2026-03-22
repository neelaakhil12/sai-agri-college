import { GraduationCap, Stethoscope } from "lucide-react";
import { achieverGroups } from "../../data/achievers";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

const groupIcons = {
  jee:  GraduationCap,
  neet: Stethoscope,
};

function AchieverCard({ item, color }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl flex-shrink-0 mx-2"
      style={{ background: color.bg, border: `1px solid ${color.border}`, minWidth: 200 }}>
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center
        font-lora font-bold text-[0.85rem] flex-shrink-0 text-white"
        style={{ background: "rgba(255,255,255,.12)", border: "1.5px solid rgba(255,255,255,.18)" }}>
        {item.initials}
      </div>
      <div className="min-w-0">
        <div className="font-semibold text-[0.83rem] text-white truncate">{item.name}</div>
        <div className="text-[0.7rem] font-bold px-2 py-[2px] rounded mt-[3px] inline-block truncate"
          style={{ color: color.tag, background: color.tagBg }}>
          {item.place}
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ group, reverse }) {
  const Icon = groupIcons[group.id];
  const items = [...group.items, ...group.items, ...group.items, ...group.items];

  return (
    <div className="mb-6">
      {/* Row label */}
      <div className="flex items-center gap-2 mb-2 px-7">
        <Icon size={13} className="text-white/40 flex-shrink-0" />
        <span className="text-[0.68rem] font-bold text-white/40 uppercase tracking-[.1em]">
          {group.title}
        </span>
      </div>
      {/* Full-width track */}
      <div className="overflow-hidden marquee-track w-full">
        <div className={`flex ${reverse ? "marquee-right" : "marquee-left"}`}
          style={{ width: "max-content" }}>
          {items.map((item, i) => (
            <AchieverCard key={i} item={item} color={group.color} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Achievers() {
  return (
    <section id="achievers" className="py-[78px] bg-ink relative overflow-hidden ach-section-bg">
      {/* Header stays constrained */}
      <div className="max-w-site mx-auto px-7 relative">
        <Reveal className="mb-11">
          <SectionHeader
            label="⑥ Success Stories"
            title={`Our Achievers at <em>India's Finest</em> Institutions`}
            subtitle="Nine years of guiding bright minds to IITs, NITs, MBBS programs, corporate placements, and top engineering colleges."
            light
          />
        </Reveal>
      </div>

      {/* Marquee rows — full viewport width */}
      <div className="w-full">
        {achieverGroups.map((group, i) => (
          <MarqueeRow key={group.id} group={group} reverse={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
}
