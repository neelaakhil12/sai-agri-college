export default function SectionHeader({ label, title, subtitle, center = false, light = false }) {
  return (
    <div className={`${center ? "text-center" : ""} mb-0`}>
      <div className={`inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[.13em] uppercase mb-[9px]
        ${light ? "text-[#93c5fd]" : "text-blue"}
        before:content-[''] before:w-[22px] before:h-[2px] before:block
        ${light ? "before:bg-[#93c5fd]" : "before:bg-blue"}`}>
        {label}
      </div>
      <h2 className={`font-lora text-[clamp(1.65rem,2.8vw,2.3rem)] font-bold leading-[1.2]
        ${light ? "text-white" : "text-ink"}`}
        dangerouslySetInnerHTML={{ __html: title }} />
      {subtitle && (
        <p className={`text-[0.9rem] leading-[1.75] mt-[10px] ${center ? "mx-auto" : ""}
          ${light ? "text-white/50" : "text-muted"} max-w-[520px]`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
