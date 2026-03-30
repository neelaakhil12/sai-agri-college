import { useSlider } from "../../hooks/useSlider";

const slides = [
  {
    bg: "linear-gradient(115deg,#071428 0%,#0f2d6e 45%,#1347a0 100%)",
    img: "/58471.JPG.jpeg",
    tag: "JEE Mains · JEE Advanced · EAPCET",
    h1: ['Step into <em class="italic text-[#fde68a]">Aakash...</em>', "Reach the Desired", "Destination."],
    motto: '"A victory Path for JEE (Main) & NEET & CPT-CMA"',
    desc: "MPC stream with the Super-40 batch — limited to 40 students for maximum personalised attention. 9 Years of Excellence guiding students to IITs and NITs.",
    btn1: { label: "Apply for MPC Admissions →", href: "#contact" },
    btn2: { label: "Explore Engineering Stream", href: "#programs" },
    stats: [
      { num: "9+",  lbl: "Years of Excellence" },
      { num: "40",  lbl: "Max Batch Size" },
      { num: "IIT", lbl: "Rankers Every Year", yellow: true },
      { num: "NIT", lbl: "Warangal & More",    yellow: true },
    ],
  },
  {
    bg: "linear-gradient(115deg,#1347a0 0%,#0f2d6e 45%,#071428 100%)",
    img: "/hero_engineering.png",
    tag: "Engineering Excellence · Super-40 Batch",
    h1: ["Master the JEE", 'with <em class="italic text-[#fde68a]">Aakash\'s</em>', "Advanced Coaching."],
    motto: '"Focused Coaching for India\'s Toughest Entrance Exams."',
    desc: "Intensive 2-year integrated program covering the complete syllabus of JEE Mains & Advanced with daily practice sessions and doubt-clearing batches.",
    btn1: { label: "Enquire for JEE 2025 →", href: "#contact" },
    btn2: { label: "View Advanced Program", href: "#programs" },
    stats: [
      { num: "20+", lbl: "Faculty Experts" },
      { num: "10k+", lbl: "Mock Tests" },
      { num: "IIT", lbl: "Preparation", yellow: true },
      { num: "BITS", lbl: "Success Rate", yellow: true },
    ],
  },
  {
    bg: "linear-gradient(115deg,#041a0e 0%,#064e2e 45%,#0e7c4b 100%)",
    img: "/hero_medical.png",
    tag: "NEET Target Batch-40 · Medical Programme · EAPCET",
    h1: ["Your MBBS Journey", 'Starts with <em class="italic text-[#fde68a]">Aakash\'s</em>', "NEET Target Batch."],
    motto: '"Step in Aakash... Reach the desired Destination."',
    desc: "BIPC with NEET & Medical Programme. Separate hostel for girls. Daily assignments and weekly tests supervised by expert Biology, Physics & Chemistry faculty.",
    btn1: { label: "Apply for BIPC Admissions →", href: "#contact" },
    btn2: { label: "Explore Medical Stream",       href: "#programs" },
    stats: [
      { num: "NEET", lbl: "Target Batch", green: true },
      { num: "40",   lbl: "Students/Class" },
      { num: "MBBS", lbl: "Achievers",    green: true },
      { num: "Dr.",  lbl: "Suman · 20 Yrs" },
    ],
  },
  {
    bg: "linear-gradient(115deg,#1a0e04 0%,#4a2d0a 45%,#c8900a 100%)",
    img: "/hero_commerce.png",
    tag: "CPT · CMA · Commerce Track",
    h1: ["Build Your Career", 'in <em class="italic text-[#fde68a]">Commerce,</em>', "CA & CMA."],
    motto: '"Step in Aakash... Reach the desired Destination."',
    desc: "MEC stream with integrated CPT & CMA coaching. Experienced Commerce and Economics faculty committed to your professional success. Placements in HCL Technology.",
    btn1: { label: "Apply for MEC Admissions →", href: "#contact" },
    btn2: { label: "Explore Commerce Stream",    href: "#programs" },
    stats: [
      { num: "CPT", lbl: "CA Foundation", yellow: true },
      { num: "CMA", lbl: "Track",         yellow: true },
      { num: "HCL", lbl: "Tech Placement" },
      { num: "KL",  lbl: "University" },
    ],
  },
];

export default function HeroSlider() {
  const { current, goTo, prev, next } = useSlider(slides.length);

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: "88vh" }}>
      {slides.map((s, i) => (
        <div key={i}
          className="absolute inset-0 w-full transition-opacity duration-[800ms] ease-in-out flex items-center"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
            pointerEvents: i === current ? "all" : "none",
          }}>

          {/* BG */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img src={s.img} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 hero-bg-pattern opacity-60" style={{ background: s.bg }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative z-[2] w-full max-w-site mx-auto px-5 md:px-7
            grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-12 items-center
            pt-16 pb-16 lg:pt-0 lg:pb-0">

            <div className="w-full">
              {/* Tag */}
              <div className="inline-flex items-center bg-white/[.12] border border-white/[.22]
                text-white/90 text-[0.62rem] md:text-[0.7rem] font-bold tracking-[.08em] uppercase
                px-3 py-[5px] rounded-full mb-4 leading-tight">
                {s.tag}
              </div>

              {/* Heading */}
              <h1 className="font-lora font-bold text-white leading-[1.2] mb-3"
                style={{ fontSize: "clamp(1.6rem,6vw,3.4rem)" }}>
                {s.h1.map((line, li) => (
                  <span key={li}>
                    <span dangerouslySetInnerHTML={{ __html: line }} />
                    {li < s.h1.length - 1 && <br />}
                  </span>
                ))}
              </h1>

              {/* Motto */}
              <div className="font-lora italic text-[0.9rem] md:text-[1.05rem] text-white/70
                border-l-[3px] border-[rgba(253,230,138,.6)] pl-4 mb-4 leading-[1.6]">
                {s.motto}
              </div>

              {/* Desc */}
              <p className="text-[0.85rem] md:text-[0.93rem] text-white/65 leading-[1.75] mb-6 max-w-[520px]">
                {s.desc}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={s.btn1.href}
                  className="inline-flex items-center justify-center gap-2 bg-white text-ink
                    px-5 py-3 rounded-[9px] font-bold text-[0.85rem] no-underline
                    transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,.14)]
                    hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,.20)]">
                  {s.btn1.label}
                </a>
                <a href={s.btn2.href}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30
                    text-white px-5 py-3 rounded-[9px] font-semibold text-[0.85rem] no-underline
                    transition-all duration-200 hover:border-white hover:bg-white/[.08]">
                  {s.btn2.label}
                </a>
              </div>
            </div>

            {/* Stat card — desktop only */}
            <div className="hidden lg:grid rounded-[18px] p-7 grid-cols-2 gap-4"
              style={{
                background: "rgba(255,255,255,.09)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,.18)",
              }}>
              {s.stats.map((st, si) => (
                <div key={si} className="text-center px-[10px] py-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.08)" }}>
                  <span className={`font-lora text-[1.8rem] font-bold block leading-none
                    ${st.yellow ? "text-[#fde68a]" : st.green ? "text-[#6ee7b7]" : "text-white"}`}>
                    {st.num}
                  </span>
                  <span className="text-[0.68rem] text-white/55 uppercase tracking-[.07em] mt-[5px] block">
                    {st.lbl}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Arrows — pushed below content on mobile */}
      <button onClick={prev}
        className="absolute left-3 bottom-16 md:bottom-auto md:top-1/2 md:-translate-y-1/2
          w-[36px] h-[36px] md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center
          z-10 text-white transition-all duration-200 hover:bg-white/[.22]"
        style={{ background: "rgba(255,255,255,.13)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.18)" }}>
        ←
      </button>
      <button onClick={next}
        className="absolute right-3 bottom-16 md:bottom-auto md:top-1/2 md:-translate-y-1/2
          w-[36px] h-[36px] md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center
          z-10 text-white transition-all duration-200 hover:bg-white/[.22]"
        style={{ background: "rgba(255,255,255,.13)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.18)" }}>
        →
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className="h-2 rounded-[4px] border-none cursor-pointer transition-all duration-300"
            style={{
              width: i === current ? 26 : 8,
              background: i === current ? "#fff" : "rgba(255,255,255,.35)",
            }} />
        ))}
      </div>
    </div>
  );
}
