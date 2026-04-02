import { useState } from "react";
import { siteConfig } from "../../data/siteConfig";
import { faqs } from "../../data/faqs";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

function ChevronDown() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-[60px] md:py-[78px] bg-cream">
      <div className="max-w-site mx-auto px-5 md:px-7">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-14">

          <Reveal>
            <SectionHeader label="Common Questions" title='Frequently Asked<br/><em>Questions</em>' />
            <p className="text-[0.88rem] md:text-[0.9rem] text-muted leading-[1.75] mt-3">
              Can't find your answer? Call us on{" "}
              <strong><a href={`tel:${siteConfig.phones[0]}`} className="text-blue no-underline hover:underline">{siteConfig.phones[0]}</a></strong>{" "}
              — our admissions team is happy to help.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col gap-[10px] mt-[6px]">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden transition-[border-color] duration-200"
                  style={{ border: `1.5px solid ${open === i ? "#15803d" : "#e2e8f0"}` }}>
                  <button onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full px-[18px] py-[15px] flex items-center justify-between
                      cursor-pointer font-semibold text-[0.85rem] md:text-[0.87rem] text-ink gap-[10px]
                      bg-transparent border-none text-left font-sora">
                    {faq.q}
                    <span style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .3s", color: open === i ? "#15803d" : "#6b7280" }}>
                      <ChevronDown />
                    </span>
                  </button>
                  <div style={{ maxHeight: open === i ? 280 : 0, overflow: "hidden", transition: "max-height .35s ease" }}>
                    <div className="px-[18px] pb-[14px] border-t border-[#e2e8f0] text-[0.83rem] text-[#374151] leading-[1.72]"
                      dangerouslySetInnerHTML={{ __html: faq.a }} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
