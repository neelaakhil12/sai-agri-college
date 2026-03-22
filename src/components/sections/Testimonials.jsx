import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

const testimonials = [
  { initials: "BG", name: "B. Geetha",    sub: "IIT Palakkad · MPC Batch",   quote: "The Super-40 batch made all the difference. My teacher in Physics knew exactly where I was struggling and gave individual attention every single day. I got into IIT Palakkad because of that focus." },
  { initials: "ES", name: "E. Sindhuja",  sub: "MBBS · BIPC NEET Batch",     quote: "I never felt behind because of supervised study hours and weekly tests. When I struggled with Biology, Dr. Suman gave extra sessions personally. That kind of attention simply doesn't exist in bigger colleges." },
  { initials: "GT", name: "G. Teja Sai",  sub: "NIT Warangal · MPC Batch",   quote: "The cumulative test analysis sessions showed me exactly which chapters needed more work each month. By the time JEE day arrived, I had no surprises. Sri Aakash built my foundation properly." },
];

export default function Testimonials() {
  return (
    <section className="py-[60px] md:py-[78px] bg-white">
      <div className="max-w-site mx-auto px-5 md:px-7">
        <Reveal className="text-center max-w-[480px] mx-auto mb-10">
          <SectionHeader label="Student Stories" title='<em>Success Stories</em> from Our Students' center />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="p-[22px] md:p-[26px] bg-cream border-[1.5px] border-[#e2e8f0] rounded-2xl
                transition-all duration-[250ms] hover:border-blue hover:shadow-[0_8px_28px_rgba(19,71,160,.08)]">
                <div className="flex gap-[3px] mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <blockquote className="text-[0.85rem] md:text-[0.87rem] text-[#374151] leading-[1.75] italic mb-[18px]">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-[38px] h-[38px] rounded-full bg-sky flex items-center justify-center
                    font-bold text-[0.82rem] text-blue flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-[0.83rem] text-ink">{t.name}</div>
                    <div className="text-[0.7rem] text-muted mt-[2px]">{t.sub}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
