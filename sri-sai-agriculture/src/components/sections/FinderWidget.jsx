export default function FinderWidget() {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const selects = [
    {
      label: "Program",
      options: ["Select Program", "B.Sc Agriculture", "M.Sc Agriculture", "Core Science Research"],
    },
    {
      label: "Specialization",
      options: ["Select specialization", "Agronomy", "Soil Science", "Plant Pathology", "Biotechnology"],
    },
    {
      label: "Campus Type",
      options: ["Select Type", "Day Scholar", "Residential – Boys", "Residential – Girls"],
    },
    {
      label: "Academic Year",
      options: ["2026–27", "2027–28"],
    },
  ];

  return (
    <div className="bg-white border-b border-[#e2e8f0] shadow-[0_4px_20px_rgba(0,0,0,.05)]">
      <div className="max-w-site mx-auto px-7 py-6 flex items-end gap-3 flex-wrap">
        <div className="w-full font-lora text-[1rem] font-bold text-ink mb-[2px]">
          Find the Right{" "}
          <span className="text-blue">Stream &amp; Batch</span> for You
        </div>

        {selects.map((s) => (
          <div key={s.label} className="flex flex-col gap-[5px] flex-1 min-w-[135px]">
            <label className="text-[0.68rem] font-bold text-muted uppercase tracking-[.08em]">
              {s.label}
            </label>
            <select
              className="px-3 py-[10px] border-[1.5px] border-[#e2e8f0] rounded-lg
                font-sora text-[0.83rem] text-ink bg-white cursor-pointer
                transition-[border-color] duration-200 focus:outline-none focus:border-blue appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                paddingRight: 30,
              }}
            >
              {s.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}

        <button onClick={scrollToContact}
          className="px-6 py-[11px] bg-blue text-white border-none rounded-lg font-sora font-bold
            text-[0.85rem] cursor-pointer flex items-center gap-2 whitespace-nowrap flex-shrink-0
            transition-all duration-200 hover:bg-blue2 hover:-translate-y-[1px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          Find My Course
        </button>
      </div>
    </div>
  );
}
