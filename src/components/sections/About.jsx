import { Building2 } from "lucide-react";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

export default function About() {
  return (
    <section id="about" className="py-[60px] md:py-[78px] bg-white">
      <div className="max-w-site mx-auto px-5 md:px-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[68px] items-start">

          <Reveal className="relative pb-6">
            <div className="w-full rounded-2xl overflow-hidden relative"
              style={{ aspectRatio: "4/3" }}>
              <img 
                src="/58471.JPG.jpeg" 
                alt="Champapet Campus, Hyderabad" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            <div className="absolute -bottom-2 -right-1 md:-right-2 bg-white border-2 border-[#e2e8f0]
              rounded-2xl px-3 md:px-[22px] py-3 md:py-[18px]
              shadow-[0_8px_28px_rgba(0,0,0,.1)] flex items-center gap-[10px] md:gap-[14px] z-[2]">
              <div className="font-lora text-[1.5rem] md:text-[2rem] font-bold text-blue leading-none">9+</div>
              <div className="text-[0.68rem] md:text-[0.75rem] text-[#374151] leading-[1.4]">
                <strong className="block font-bold text-ink text-[0.72rem] md:text-[0.82rem]">Years of Excellence</strong>
                Shaping Hyderabad's brightest futures
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="pt-1">
            <SectionHeader label="② About Us & Vision" title='Welcome to <em>SRI Aakash</em><br/>IIT-Medical Academy' />

            <div className="mt-5 mb-5 px-[18px] md:px-[22px] py-4 md:py-5 bg-sky2 border-l-4 border-blue rounded-r-xl">
              <p className="font-lora italic text-[0.98rem] md:text-[1.05rem] text-blue2 m-0 leading-[1.6]">
                "Step in Aakash... Reach the desired Destination."
              </p>
              <span className="block text-[0.7rem] md:text-[0.72rem] font-bold text-blue uppercase tracking-[.08em] mt-[6px]">
                — Motto · 9 Years of Excellence
              </span>
            </div>

            <p className="text-[0.9rem] md:text-[0.92rem] text-[#374151] leading-[1.82] mb-[14px]">
              SRI Aakash IIT-Medical Academy / Aakash Junior College is officially recognised by the
              Government of Telangana (College Code: 58471). For over nine years, we have stood as{" "}
              <strong>a victory path for JEE (Main) &amp; NEET &amp; CPT-CMA</strong> aspirants across Hyderabad.
            </p>
            <p className="text-[0.9rem] md:text-[0.92rem] text-[#374151] leading-[1.82] mb-[14px]">
              We operate on a simple but powerful principle — every student in our classroom deserves
              focused attention. That is why we cap every batch at just 40 students.
            </p>

            <div className="mt-6 rounded-2xl p-[22px] md:p-[26px] relative overflow-hidden quote-mark"
              style={{ background: "linear-gradient(135deg,#0b1220 0%,#1e2d42 100%)" }}>
              <blockquote className="font-lora italic text-[0.9rem] md:text-[0.95rem] text-white/85 leading-[1.75] mb-4 relative">
                "A good teacher is a selfless role model and a visionary for student success. My goal
                at SRI Aakash has always been to ensure that every student who walks through these doors
                reaches the destination they've dreamed of."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue flex items-center justify-center
                  text-white font-bold text-[0.88rem] flex-shrink-0">YR</div>
                <div>
                  <div className="text-[0.8rem] text-[#93c5fd] font-bold">Y. Rajender Reddy</div>
                  <div className="text-[0.7rem] text-white/45 mt-[2px]">Principal &amp; Correspondent · 20 Years Experience</div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
